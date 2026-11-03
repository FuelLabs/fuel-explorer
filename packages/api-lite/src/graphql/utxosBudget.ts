import {
  type FragmentDefinitionNode,
  GraphQLError,
  type GraphQLNamedType,
  type GraphQLSchema,
  Kind,
  type SelectionSetNode,
  getArgumentValues,
  getNamedType,
  getOperationAST,
  getVariableValues,
  isInterfaceType,
  isObjectType,
} from 'graphql';
import type { Plugin } from 'graphql-yoga';
import { MAX_PAGE_SIZE } from './resolvers/passthrough';

// Each Balance.utxos resolves to one fuel-core coins query. The worst case is
// summed per HTTP request, before execution, with every paginated field
// multiplying the fields under it by its page size.
const lookupsByRequest = new WeakMap<object, number>();

type Walk = {
  schema: GraphQLSchema;
  fragments: Map<string, FragmentDefinitionNode>;
  variables: Record<string, unknown>;
  fragmentCost: Map<string, number>;
};

// Worst case of what upstream may honor: the larger of first and last, and a
// full page when neither is positive.
function pageSize(args: Record<string, unknown>): number {
  const sizes = [args.first, args.last].filter(
    (n): n is number => typeof n === 'number' && n > 0,
  );
  return sizes.length === 0
    ? MAX_PAGE_SIZE
    : Math.min(Math.max(...sizes), MAX_PAGE_SIZE);
}

function utxosLookups(
  selectionSet: SelectionSetNode,
  parent: GraphQLNamedType | undefined,
  walk: Walk,
): number {
  let total = 0;
  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.INLINE_FRAGMENT) {
      const type = selection.typeCondition
        ? walk.schema.getType(selection.typeCondition.name.value)
        : parent;
      total += utxosLookups(selection.selectionSet, type ?? undefined, walk);
      continue;
    }
    if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const name = selection.name.value;
      let cost = walk.fragmentCost.get(name);
      if (cost === undefined) {
        // Set first so a cycle counts as 0; NoFragmentCyclesRule reports it.
        walk.fragmentCost.set(name, 0);
        const fragment = walk.fragments.get(name);
        cost = fragment
          ? utxosLookups(
              fragment.selectionSet,
              walk.schema.getType(fragment.typeCondition.name.value) ??
                undefined,
              walk,
            )
          : 0;
        walk.fragmentCost.set(name, cost);
      }
      total += cost;
      continue;
    }
    if (!isObjectType(parent) && !isInterfaceType(parent)) continue;
    const field = parent.getFields()[selection.name.value];
    if (!field) continue;
    if (parent.name === 'Balance' && field.name === 'utxos') {
      total += 1;
      continue;
    }
    if (!selection.selectionSet) continue;
    const paginated = field.args.some(
      (arg) => arg.name === 'first' || arg.name === 'last',
    );
    const multiplier = paginated
      ? pageSize(getArgumentValues(field, selection, walk.variables))
      : 1;
    total +=
      multiplier *
      utxosLookups(selection.selectionSet, getNamedType(field.type), walk);
  }
  return total;
}

export function useUtxosBudget(maxLookups: number): Plugin {
  return {
    onExecute({ args, setResultAndStopExecution }) {
      const operation = getOperationAST(args.document, args.operationName);
      if (!operation) return;
      const fragments = new Map<string, FragmentDefinitionNode>();
      for (const definition of args.document.definitions) {
        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
          fragments.set(definition.name.value, definition);
        }
      }
      // Coerced as execute will see them, defaults included.
      const coerced = getVariableValues(
        args.schema,
        operation.variableDefinitions ?? [],
        args.variableValues ?? {},
      );
      // Execution reports invalid variables without running any resolver.
      if (coerced.errors) return;
      const lookups = utxosLookups(
        operation.selectionSet,
        args.schema.getRootType(operation.operation) ?? undefined,
        {
          schema: args.schema,
          fragments,
          variables: coerced.coerced,
          fragmentCost: new Map(),
        },
      );
      const request = (args.contextValue as { request?: object }).request;
      const total =
        (request ? (lookupsByRequest.get(request) ?? 0) : 0) + lookups;
      if (request) lookupsByRequest.set(request, total);
      if (total > maxLookups) {
        setResultAndStopExecution({
          errors: [
            new GraphQLError(
              `Requests are limited to ${maxLookups} utxos lookups`,
            ),
          ],
        });
      }
    },
  };
}
