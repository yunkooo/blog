import type { ReactNode } from "react";

export function KeyPoint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-[1.35rem] border border-foreground/10 bg-gradient-to-br from-muted/55 to-background px-5 py-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <p className="flex items-start gap-2 text-lg font-medium leading-8 tracking-[-0.01em] text-foreground">
        <span aria-hidden="true" className="translate-y-[0.02em]">
          💡
        </span>
        <span>{title}</span>
      </p>
      <div className="mt-3 space-y-2 text-[1rem] leading-8 text-muted-foreground">{children}</div>
    </aside>
  );
}
