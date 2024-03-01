CREATE TABLE IF NOT EXISTS "blocks" (
	"_id" integer PRIMARY KEY NOT NULL,
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	CONSTRAINT "blocks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inputs" (
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	"transaction_id" integer NOT NULL,
	CONSTRAINT "inputs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outputs" (
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	"transaction_id" integer NOT NULL,
	CONSTRAINT "outputs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"_id" integer PRIMARY KEY NOT NULL,
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
CREATE INDEX IF NOT EXISTS "inputs_timestamp_index" ON "inputs" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inputs_id_index" ON "inputs" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "outputs_timestamp_index" ON "outputs" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "outputs_id_index" ON "outputs" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_timestamp_index" ON "transactions" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions__id_index" ON "transactions" ("_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_transaction_id_transactions__id_fk" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "outputs" ADD CONSTRAINT "outputs_transaction_id_transactions__id_fk" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_block_id_blocks__id_fk" FOREIGN KEY ("block_id") REFERENCES "blocks"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
