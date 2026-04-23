import type { ReactNode } from "react";

export function KeyPoint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-[1.35rem] border border-foreground/10 bg-muted/45 px-5 py-4">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Key Point
      </p>
      <p className="mt-2 text-lg font-medium leading-8 tracking-[-0.01em] text-foreground">
        {title}
      </p>
      <div className="mt-3 space-y-2 text-[1rem] leading-8 text-muted-foreground">{children}</div>
    </aside>
  );
}
