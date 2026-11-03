import {
  type FieldNode,
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
  nodeIds: Map<SelectionSetNode, number>;
  costs: Map<string, number>;
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

// Fields sharing a response key on the same type run once, like execution's
// field collection; each fragment is expanded once per merged group.
function collectFields(
  selectionSets: readonly SelectionSetNode[],
  parent: GraphQLNamedType | undefined,
  walk: Walk,
): Map<string, { type: GraphQLNamedType | undefined; nodes: FieldNode[] }> {
  const groups = new Map<
    string,
    { type: GraphQLNamedType | undefined; nodes: FieldNode[] }
  >();
  const visited = new Set<string>();
  const visit = (set: SelectionSetNode, type: GraphQLNamedType | undefined) => {
    for (const selection of set.selections) {
      if (selection.kind === Kind.FIELD) {
        const key = `${type?.name}.${selection.alias?.value ?? selection.name.value}`;
        const group = groups.get(key) ?? { type, nodes: [] };
        group.nodes.push(selection);
        groups.set(key, group);
      } else if (selection.kind === Kind.INLINE_FRAGMENT) {
        const condition = selection.typeCondition
          ? walk.schema.getType(selection.typeCondition.name.value)
          : type;
        visit(selection.selectionSet, condition ?? undefined);
      } else if (!visited.has(selection.name.value)) {
        visited.add(selection.name.value);
        const fragment = walk.fragments.get(selection.name.value);
        if (fragment) {
          visit(
            fragment.selectionSet,
            walk.schema.getType(fragment.typeCondition.name.value) ?? undefined,
          );
        }
      }
    }
  };
  for (const set of selectionSets) visit(set, parent);
  return groups;
}

function nodeId(set: SelectionSetNode, walk: Walk): number {
  let id = walk.nodeIds.get(set);
  if (id === undefined) {
    id = walk.nodeIds.size;
    walk.nodeIds.set(set, id);
  }
  return id;
}

function utxosLookups(
  selectionSets: readonly SelectionSetNode[],
  parent: GraphQLNamedType | undefined,
  walk: Walk,
): number {
  // The same merged selection is reached again through repeated fragments.
  const memoKey = `${parent?.name}:${selectionSets.map((set) => nodeId(set, walk)).join(',')}`;
  const memo = walk.costs.get(memoKey);
  if (memo !== undefined) return memo;
  walk.costs.set(memoKey, 0);
  let total = 0;
  for (const { type, nodes } of collectFields(
    selectionSets,
    parent,
    walk,
  ).values()) {
    if (!isObjectType(type) && !isInterfaceType(type)) continue;
    const field = type.getFields()[nodes[0].name.value];
    if (!field) continue;
    if (type.name === 'Balance' && field.name === 'utxos') {
      total += 1;
      continue;
    }
    const children = nodes.flatMap((node) =>
      node.selectionSet ? [node.selectionSet] : [],
    );
    if (children.length === 0) continue;
    const paginated = field.args.some(
      (arg) => arg.name === 'first' || arg.name === 'last',
    );
    const multiplier = paginated
      ? pageSize(getArgumentValues(field, nodes[0], walk.variables))
      : 1;
    total +=
      multiplier * utxosLookups(children, getNamedType(field.type), walk);
  }
  walk.costs.set(memoKey, total);
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
        [operation.selectionSet],
        args.schema.getRootType(operation.operation) ?? undefined,
        {
          schema: args.schema,
          fragments,
          variables: coerced.coerced,
          nodeIds: new Map(),
          costs: new Map(),
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
