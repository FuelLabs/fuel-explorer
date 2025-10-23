export function tagIdFactory(tag: string, tagData: string | undefined) {
  return tagData ? `${tag}-${tagData}` : tag;
}
