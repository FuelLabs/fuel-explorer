export class GQLNode {
  static filterByType<T extends Partial<{ __typename: any }>>(
    nodes: T[],
    type: T['__typename'],
  ) {
    return nodes.filter((node) => node.__typename === type);
  }
}
