import { widget_settings } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type WidgetSettings = InferSelectModel<typeof widget_settings>;
