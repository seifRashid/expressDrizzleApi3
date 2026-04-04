CREATE TABLE "watchlist_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"movie_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "watchlist_table" ADD CONSTRAINT "watchlist_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_table" ADD CONSTRAINT "watchlist_table_movie_id_movies_table_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies_table"("id") ON DELETE cascade ON UPDATE no action;