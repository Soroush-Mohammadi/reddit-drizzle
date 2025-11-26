CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"age" integer,
	"email" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
