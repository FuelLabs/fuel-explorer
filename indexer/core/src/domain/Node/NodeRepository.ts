import { db } from '@core/db';
import type { DbConnection, DbTransaction } from '@core/infra/database/Db';
import { eq } from 'drizzle-orm';
import { type GQLNodeType, NodeEntity } from './NodeEntity';
import { NodesTable } from './NodeModel';
import type { NodeStatusEnum } from './vo/NodeStatus';
import type { NodeTypeEnum } from './vo/NodeType';

export class NodeRepository {
  async findById(id: string) {
    const [first] = await db
      .connection()
      .select()
      .from(NodesTable)
      .where(eq(NodesTable.id, id));

    if (!first) return null;
    return NodeEntity.create(first);
  }

  async upsertOne(node: GQLNodeType, type: keyof typeof NodeTypeEnum) {
    const upsertOne = this.createUpsertOne(db.connection(), type);
    return upsertOne(node);
  }

  async upsertMany(nodes: GQLNodeType[], type: keyof typeof NodeTypeEnum) {
    return db.connection().transaction(async (trx) => {
      const queries = nodes.map(this.createUpsertOne(trx, type));
      return Promise.all(queries.filter(Boolean));
    });
  }

  async updateNodeStatus(id: string, status: NodeStatusEnum) {
    const [item] = await db
      .connection()
      .update(NodesTable)
      .set({ status })
      .where(eq(NodesTable.id, id))
      .returning();
    return NodeEntity.create(item);
  }

  private createUpsertOne(
    conn: DbConnection | DbTransaction,
    type: keyof typeof NodeTypeEnum,
  ) {
    return async (node: GQLNodeType) => {
      const [item] = await conn
        .insert(NodesTable)
        .values(NodeEntity.toDBItem(node, type))
        .onConflictDoUpdate({
          target: [NodesTable.id],
          set: { data: node },
        })
        .returning();

      return NodeEntity.create(item);
    };
  }
}
