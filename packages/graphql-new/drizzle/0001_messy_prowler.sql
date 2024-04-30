CREATE TABLE IF NOT EXISTS "bridge_blocks" (
	"number" bigint PRIMARY KEY NOT NULL,
	"hash" varchar(66) NOT NULL,
	"timestamp" bigint NOT NULL,
	"data" jsonb NOT NULL,
	CONSTRAINT "bridge_blocks_hash_unique" UNIQUE("hash"),
	CONSTRAINT "bridge_blocks_timestamp_unique" UNIQUE("timestamp")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_contract_logs" (
	"_id" varchar(66) PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"contract_id" varchar(66) NOT NULL,
	"log_index" integer NOT NULL,
	"block_number" bigint NOT NULL,
	"args" jsonb NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bridge_blocks_hash_index" ON "bridge_blocks" ("hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bridge_blocks_timestamp_index" ON "bridge_blocks" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bridge_contract_logs_block_number_index" ON "bridge_contract_logs" ("block_number");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_contract_logs" ADD CONSTRAINT "bridge_contract_logs_block_number_bridge_blocks_number_fk" FOREIGN KEY ("block_number") REFERENCES "bridge_blocks"("number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
