import { delegateToSchema } from "@graphql-tools/delegate";
import { GraphQLResolveInfo, OperationTypeNode } from "graphql";
import { metadataSchema } from "~/services/metadata";

export function delegateQueryTokens(
  assetsId: Array<string>,
  context: any,
  info: GraphQLResolveInfo
) {
  return delegateToSchema({
    schema: metadataSchema,
    operation: OperationTypeNode.QUERY,
    fieldName: "tokens",
    args: { assetsId },
    context,
    info,
  });
}
