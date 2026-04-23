import type { ReactNode } from "react";

type InsightCardProps = {
  title?: string;
  children: ReactNode;
};

export function InsightCard({ title = "배운 점", children }: InsightCardProps) {
  return (
    <aside className="not-prose my-7 rounded-[1.35rem] border border-border/80 bg-background px-5 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.035)] dark:shadow-none">
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span aria-hidden="true">✦</span>
        <span>{title}</span>
      </p>
      <div className="mt-3 text-[1.04rem] leading-8 text-foreground/82">{children}</div>
    </aside>
  );
}
