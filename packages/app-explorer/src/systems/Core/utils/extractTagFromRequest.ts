import { TX_TAGS } from '~/systems/Transaction/constants/tags';
import { tagIdFactory } from './tagIdFactory';

export function extractTagFromRequest(request: RequestInit | undefined) {
  const headers = request?.headers as Record<string, string> | undefined;
  const tagName = headers?.tagName
    ? TX_TAGS?.[headers?.tagName as keyof typeof TX_TAGS]
    : undefined;
  const tagId = headers?.tagId;
  if (!tagName) {
    return [];
  }

  return [tagIdFactory(tagName, tagId)];
}
