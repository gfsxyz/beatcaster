import { widget_settings } from "@/db/schema";
import { InferEnum, InferSelectModel } from "drizzle-orm";

export type WidgetSettings = InferSelectModel<typeof widget_settings>;
export type FontEnum = InferEnum<typeof widget_settings.font>;
