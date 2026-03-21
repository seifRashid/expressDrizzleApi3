ALTER TABLE "users_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "sec_name" text NOT NULL;