CREATE TYPE "public"."size" AS ENUM('small', 'medium', 'large');--> statement-breakpoint
ALTER TABLE "widget_setting" RENAME COLUMN "title" TO "show_title";--> statement-breakpoint
ALTER TABLE "widget_setting" RENAME COLUMN "artists" TO "show_artist";--> statement-breakpoint
ALTER TABLE "widget_setting" RENAME COLUMN "albumCover" TO "show_album_cover";--> statement-breakpoint
ALTER TABLE "widget_setting" ALTER COLUMN "size" SET DEFAULT 'medium'::"public"."size";--> statement-breakpoint
ALTER TABLE "widget_setting" ALTER COLUMN "size" SET DATA TYPE "public"."size" USING "size"::"public"."size";--> statement-breakpoint
ALTER TABLE "widget_setting" DROP COLUMN "timestamp";