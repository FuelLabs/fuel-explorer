ALTER TABLE "blocks" ADD COLUMN "height" integer NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blocks_height_index" ON "blocks" ("height");