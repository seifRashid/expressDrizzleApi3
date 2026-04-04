ALTER TABLE "watchlist_table" ADD COLUMN "status" text DEFAULT 'watching' NOT NULL;--> statement-breakpoint
ALTER TABLE "watchlist_table" ADD COLUMN "rating" integer;