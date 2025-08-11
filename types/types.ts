import { widget_settings } from "@/db/schema";
import { InferEnum, InferSelectModel } from "drizzle-orm";
import { HTMLAttributes } from "react";

export type WidgetSettings = InferSelectModel<typeof widget_settings>;
export type FontEnum = InferEnum<typeof widget_settings.font>;

export type ClassName<T extends HTMLElement = HTMLElement> =
  HTMLAttributes<T>["className"];
