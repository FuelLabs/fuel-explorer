import { index, pgTable } from 'drizzle-orm/pg-core';
import { NodeData } from './vo/NodeData';
import { NodeID } from './vo/NodeID';
import { NodeType } from './vo/NodeType';

export const NodesTable = pgTable(
  'nodes',
  {
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
