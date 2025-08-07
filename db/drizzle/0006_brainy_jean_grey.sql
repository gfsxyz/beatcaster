CREATE TYPE "public"."font" AS ENUM('default', 'geistMono', 'comicSans');--> statement-breakpoint
ALTER TABLE "widget_setting" ADD COLUMN "font" "font" DEFAULT 'default' NOT NULL;