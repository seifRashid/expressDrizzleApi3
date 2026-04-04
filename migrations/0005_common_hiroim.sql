CREATE TABLE "movies_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"director" text NOT NULL,
	"release_year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
