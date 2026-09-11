import {
  type FieldNode,
  GraphQLError,
  Kind,
  type SelectionNode,
  type ValidationContext,
} from 'graphql';
import type { Plugin } from 'graphql-yoga';

// @escape.tech/graphql-armor-max-depth is not installed in this workspace, so
// this rule reimplements its check by hand with graphql's own visit/
// ValidationContext, per the task-4 brief.
function selectionSetDepth(
  selections: readonly SelectionNode[],
  context: ValidationContext,
  seenFragments: ReadonlySet<string>,
): number {
  let max = 0;
  for (const selection of selections) {
    max = Math.max(max, selectionDepth(selection, context, seenFragments));
  }
  return max;
}

function selectionDepth(
  selection: SelectionNode,
  context: ValidationContext,
  seenFragments: ReadonlySet<string>,
): number {
  switch (selection.kind) {
    case Kind.FIELD: {
      const field = selection as FieldNode;
      if (!field.selectionSet) return 0;
      return (
        1 +
        selectionSetDepth(field.selectionSet.selections, context, seenFragments)
      );
    }
    case Kind.INLINE_FRAGMENT:
      return selectionSetDepth(
        selection.selectionSet.selections,
        context,
        seenFragments,
      );
    case Kind.FRAGMENT_SPREAD: {
      const name = selection.name.value;
      // NoFragmentCycles (a default graphql-js validation rule) rejects
      // cyclic fragments before this rule runs; this guard just keeps a
      // malformed document from recursing forever within this rule itself.
      if (seenFragments.has(name)) return 0;
      // ValidationContext already indexes fragment definitions by name, so
      // there's no need to rebuild that lookup from the document ourselves.
      const fragment = context.getFragment(name);
      if (!fragment) return 0;
      return selectionSetDepth(
        fragment.selectionSet.selections,
        context,
        new Set(seenFragments).add(name),
      );
    }
    default:
      return 0;
  }
}

/** A yoga plugin rejecting operations nested deeper than `maxDepth` levels of fields. */
export function useMaxDepth(maxDepth: number): Plugin {
  return {
    onValidate({ addValidationRule }) {
      addValidationRule((context: ValidationContext) => ({
        OperationDefinition(node) {
          const depth = selectionSetDepth(
            node.selectionSet.selections,
            context,
            new Set(),
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
