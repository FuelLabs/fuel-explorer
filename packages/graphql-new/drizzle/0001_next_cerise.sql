CREATE TABLE IF NOT EXISTS "bridge_transactions" (
	"_id" serial PRIMARY KEY NOT NULL,
	"type" "type" NOT NULL,
	"eth_tx_id" varchar(66) NOT NULL,
	"fuel_tx_id" varchar(66) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bridge_transactions__id_index" ON "bridge_transactions" ("_id");