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

// Fields sharing a response key merge into one execution, so the count is of
// distinct keys, however many fragments repeat them.
function collectRootKeys(
  selectionSet: SelectionSetNode,
  fragments: Map<string, FragmentDefinitionNode>,
  visited: Set<string>,
  keys: Set<string>,
): void {
  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD) {
      keys.add(selection.alias?.value ?? selection.name.value);
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      collectRootKeys(selection.selectionSet, fragments, visited, keys);
    } else if (!visited.has(selection.name.value)) {
      visited.add(selection.name.value);
      const fragment = fragments.get(selection.name.value);
      if (fragment)
        collectRootKeys(fragment.selectionSet, fragments, visited, keys);
    }
  }
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
  const keys = new Set<string>();
  collectRootKeys(operation.selectionSet, fragments, new Set(), keys);
  return keys.size;
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
