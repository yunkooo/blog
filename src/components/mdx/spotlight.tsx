import type { ReactNode } from "react";

type SpotlightProps = {
  title?: string;
  children: ReactNode;
};

export function Spotlight({ title = "핵심", children }: SpotlightProps) {
  return (
    <aside className="not-prose my-8 rounded-[1.6rem] border border-foreground/10 bg-gradient-to-br from-muted/60 via-background to-muted/30 px-6 py-6">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-3 text-[1.2rem] font-medium leading-9 tracking-[-0.015em] text-foreground sm:text-[1.32rem] sm:leading-10">
        {children}
      </div>
    </aside>
  );
}
