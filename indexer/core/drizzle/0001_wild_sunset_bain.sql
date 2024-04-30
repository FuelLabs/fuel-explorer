DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('not_synced', 'synced', 'dirty');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Block', 'Transaction');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nodes" (
	"status" "status" DEFAULT 'not_synced',
	"node_id" varchar(66) PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"type" "type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "node_data_id" varchar(66);--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "node_data_id" varchar(66);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nodes_node_id_index" ON "nodes" ("node_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocks" ADD CONSTRAINT "blocks_node_data_id_nodes_node_id_fk" FOREIGN KEY ("node_data_id") REFERENCES "nodes"("node_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_node_data_id_nodes_node_id_fk" FOREIGN KEY ("node_data_id") REFERENCES "nodes"("node_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "blocks" DROP COLUMN IF EXISTS "data";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "data";