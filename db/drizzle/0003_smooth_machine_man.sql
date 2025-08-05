CREATE TABLE "widget_setting" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"artists" text NOT NULL,
	"albumCover" text NOT NULL,
	"size" text NOT NULL,
	"timestamp" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "widget_setting_userId_id_pk" PRIMARY KEY("userId","id")
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "spotify_access_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "spotify_refresh_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "widget_setting" ADD CONSTRAINT "widget_setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;