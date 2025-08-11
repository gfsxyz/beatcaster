import type { ReactNode } from "react";

export default function WidgetLayout({ children }: { children: ReactNode }) {
  return <div className="widget-background">{children}</div>;
}
