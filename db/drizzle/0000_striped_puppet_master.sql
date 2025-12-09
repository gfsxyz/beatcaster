CREATE TYPE "public"."font" AS ENUM('default', 'geistMono', 'comicSans');--> statement-breakpoint
CREATE TYPE "public"."size" AS ENUM('small', 'medium', 'large');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"widget_id" text,
	"spotify_access_token" text,
	"spotify_refresh_token" text,
	CONSTRAINT "user_widget_id_unique" UNIQUE("widget_id")
);
--> statement-breakpoint
CREATE TABLE "widget_setting" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"show_title" boolean DEFAULT true NOT NULL,
	"show_artist" boolean DEFAULT true NOT NULL,
	"show_album_cover" boolean DEFAULT true NOT NULL,
	"font" "font" DEFAULT 'default' NOT NULL,
	"size" "size" DEFAULT 'medium' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "widget_setting" ADD CONSTRAINT "widget_setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;