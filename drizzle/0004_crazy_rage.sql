CREATE TABLE "community_interests" (
	"id" serial PRIMARY KEY NOT NULL,
	"community_id" integer NOT NULL,
	"interest_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "community_interests" ADD CONSTRAINT "community_interests_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_interests" ADD CONSTRAINT "community_interests_interest_id_interests_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE cascade ON UPDATE no action;