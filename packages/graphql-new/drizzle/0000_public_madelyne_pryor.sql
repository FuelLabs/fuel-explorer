CREATE TABLE IF NOT EXISTS "blocks" (
	"_id" integer PRIMARY KEY NOT NULL,
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	CONSTRAINT "blocks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp,
	"data" jsonb NOT NULL,
	"accountsIndex" text DEFAULT '' NOT NULL,
	"block_id" integer NOT NULL,
	CONSTRAINT "transactions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks_timestamp_index" ON "blocks" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks__id_index" ON "blocks" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_timestamp_index" ON "transactions" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_id_index" ON "transactions" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_block_id_blocks__id_fk" FOREIGN KEY ("block_id") REFERENCES "blocks"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
