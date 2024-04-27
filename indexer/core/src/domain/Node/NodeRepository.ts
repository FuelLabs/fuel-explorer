import { db } from '@core/db';
import type { DbConnection, DbTransaction } from '@core/infra/database/Db';
import { eq } from 'drizzle-orm';
import { type GQLNodeType, NodeEntity } from './NodeEntity';
import { NodesTable } from './NodeModel';

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

  async upsertOne(node: GQLNodeType) {
    const upsertOne = this.createUpsertOne(db.connection());
    return upsertOne(node);
  }

  async upsertMany(nodes: GQLNodeType[]) {
    return db.connection().transaction(async (trx) => {
      const queries = nodes.map(this.createUpsertOne(trx));
      return Promise.all(queries.filter(Boolean));
    });
  }

  private createUpsertOne(conn: DbConnection | DbTransaction) {
    return async (node: GQLNodeType) => {
      const [item] = await conn
        .insert(NodesTable)
        .values(NodeEntity.toDBItem(node))
        .onConflictDoUpdate({
          target: [NodesTable.id],
          set: { data: node },
        })
        .returning();

      return NodeEntity.create(item);
    };
  }
}
