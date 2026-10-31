import {
  type DocumentNode,
  type FragmentDefinitionNode,
  GraphQLError,
  Kind,
  type OperationDefinitionNode,
  type SelectionSetNode,
  getOperationAST,
} from 'graphql';
import type { Plugin } from 'graphql-yoga';

// Page clamps bound the nodes behind one field, not how many times a request
// asks for it: each alias is its own upstream query. The count is kept per
// HTTP request because batching runs every operation of a batch against the
// same request, so a per-operation cap alone would still multiply by the
// batch limit.
const rootFieldsByRequest = new WeakMap<object, number>();

function countRootFields(
  selectionSet: SelectionSetNode,
  fragments: Map<string, FragmentDefinitionNode>,
  counted: Map<string, number>,
): number {
  let total = 0;
  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD) {
      total += 1;
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      total += countRootFields(selection.selectionSet, fragments, counted);
    } else {
      const name = selection.name.value;
      let count = counted.get(name);
      if (count === undefined) {
        // Set first so a cycle counts as 0; NoFragmentCyclesRule reports it.
        counted.set(name, 0);
        const fragment = fragments.get(name);
        count = fragment
          ? countRootFields(fragment.selectionSet, fragments, counted)
          : 0;
        counted.set(name, count);
      }
      total += count;
    }
  }
  return total;
}

function rootFieldCount(
  document: DocumentNode,
  operation: OperationDefinitionNode,
): number {
  const fragments = new Map<string, FragmentDefinitionNode>();
  for (const definition of document.definitions) {
    if (definition.kind === Kind.FRAGMENT_DEFINITION) {
      fragments.set(definition.name.value, definition);
    }
  }
  return countRootFields(operation.selectionSet, fragments, new Map());
}

export function useMaxRootFields(maxRootFields: number): Plugin {
  return {
    onExecute({ args, setResultAndStopExecution }) {
      const operation = getOperationAST(args.document, args.operationName);
      if (!operation) return;
      const request = (args.contextValue as { request?: object }).request;
      const previous = request ? (rootFieldsByRequest.get(request) ?? 0) : 0;
      const total = previous + rootFieldCount(args.document, operation);
      if (request) rootFieldsByRequest.set(request, total);
      if (total > maxRootFields) {
        setResultAndStopExecution({
          errors: [
            new GraphQLError(
              `Requests are limited to ${maxRootFields} top-level fields`,
            ),
          ],
        });
      }
    },
  };
}
