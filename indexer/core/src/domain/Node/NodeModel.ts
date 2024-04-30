import { index, pgTable } from 'drizzle-orm/pg-core';
import { NodeData } from './vo/NodeData';
import { NodeID } from './vo/NodeID';
import { NodeStatus } from './vo/NodeStatus';
import { NodeType } from './vo/NodeType';

export { typeEnum } from './vo/NodeType';
export { statusEnum } from './vo/NodeStatus';

export const NodesTable = pgTable(
  'nodes',
  {
    status: NodeStatus.type(),
    id: NodeID.type(),
    data: NodeData.type(),
    type: NodeType.type(),
  },
  (table) => ({
    nodeIdIdx: index().on(table.id),
  }),
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NodeItem<T = any> = typeof NodesTable.$inferSelect & {
  data: T;
};
