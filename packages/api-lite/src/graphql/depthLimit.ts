import {
  type FieldNode,
  GraphQLError,
  Kind,
  type OperationDefinitionNode,
  type SelectionNode,
  type ValidationContext,
} from 'graphql';
import type { Plugin } from 'graphql-yoga';

// Memoized per operation: re-walking a fragment at every spread is exponential.
type FragmentDepths = {
  done: Map<string, number>;
  inProgress: Set<string>;
};

function selectionSetDepth(
  selections: readonly SelectionNode[],
  context: ValidationContext,
  fragments: FragmentDepths,
): number {
  let max = 0;
  for (const selection of selections) {
    max = Math.max(max, selectionDepth(selection, context, fragments));
  }
  return max;
}

function selectionDepth(
  selection: SelectionNode,
  context: ValidationContext,
  fragments: FragmentDepths,
): number {
  switch (selection.kind) {
    case Kind.FIELD: {
      const field = selection as FieldNode;
      if (!field.selectionSet) return 0;
      return (
        1 + selectionSetDepth(field.selectionSet.selections, context, fragments)
      );
    }
    case Kind.INLINE_FRAGMENT:
      return selectionSetDepth(
        selection.selectionSet.selections,
        context,
        fragments,
      );
    case Kind.FRAGMENT_SPREAD: {
      const name = selection.name.value;
      const known = fragments.done.get(name);
      if (known !== undefined) return known;
      // A cycle; graphql's NoFragmentCyclesRule reports it separately.
      if (fragments.inProgress.has(name)) return 0;
      const fragment = context.getFragment(name);
      if (!fragment) return 0;
      fragments.inProgress.add(name);
      const depth = selectionSetDepth(
        fragment.selectionSet.selections,
        context,
        fragments,
      );
      fragments.inProgress.delete(name);
      fragments.done.set(name, depth);
      return depth;
    }
    default:
      return 0;
  }
}

export function useMaxDepth(maxDepth: number): Plugin {
  return {
    onValidate({ addValidationRule }) {
      addValidationRule((context: ValidationContext) => ({
        OperationDefinition(node: OperationDefinitionNode) {
          const depth = selectionSetDepth(
            node.selectionSet.selections,
            context,
            { done: new Map(), inProgress: new Set() },
          );
          if (depth > maxDepth) {
            context.reportError(
              new GraphQLError(`Query depth limit of ${maxDepth} exceeded`, {
                nodes: node,
              }),
            );
          }
        },
      }));
    },
  };
}
