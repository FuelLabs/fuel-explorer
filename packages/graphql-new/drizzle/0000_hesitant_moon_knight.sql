CREATE TABLE IF NOT EXISTS "blocks" (
	"_id" integer PRIMARY KEY NOT NULL,
	"id" varchar(66) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	"gas_used" varchar(66),
	"producer" varchar(66),
	CONSTRAINT "blocks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts" (
	"_id" serial PRIMARY KEY NOT NULL,
	"contract_hash" varchar(66) NOT NULL,
	"data" jsonb NOT NULL,
	CONSTRAINT "contracts_contract_hash_unique" UNIQUE("contract_hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inputs" (
	"_id" serial PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"transaction_id" varchar(66) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "operations" (
	"_id" serial PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"transaction_id" varchar(66) NOT NULL,
	"transaction_hash" varchar(66) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outputs" (
	"_id" serial PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"transaction_id" varchar(66) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "predicates" (
	"_id" serial PRIMARY KEY NOT NULL,
	"bytecode" text NOT NULL,
	"address" varchar(66) NOT NULL,
	CONSTRAINT "predicates_address_unique" UNIQUE("address")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"_id" varchar(66) PRIMARY KEY NOT NULL,
	"tx_hash" varchar(66) NOT NULL,
	"timestamp" timestamp,
	"data" jsonb NOT NULL,
	"accountIndex" text DEFAULT '' NOT NULL,
	"block_id" integer NOT NULL,
	CONSTRAINT "transactions_tx_hash_unique" UNIQUE("tx_hash")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks_timestamp_index" ON "blocks" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks_id_index" ON "blocks" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks__id_index" ON "blocks" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contracts__id_index" ON "contracts" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contracts_contract_hash_index" ON "contracts" ("contract_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inputs__id_index" ON "inputs" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "operations__id_index" ON "operations" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "outputs__id_index" ON "outputs" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "predicates__id_index" ON "predicates" ("_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "predicates_address_index" ON "predicates" ("address");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_timestamp_index" ON "transactions" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions__id_index" ON "transactions" ("_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_transaction_id_transactions__id_fk" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "operations" ADD CONSTRAINT "operations_transaction_id_transactions__id_fk" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("_id") ON DELETE no action ON UPDATE no action;
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
