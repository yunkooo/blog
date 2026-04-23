import type { ReactNode } from "react";

type AsideNoteProps = {
  title?: string;
  children: ReactNode;
};

export function AsideNote({ title = "참고", children }: AsideNoteProps) {
  return (
    <aside className="not-prose my-6 rounded-2xl border border-dashed border-border bg-muted/25 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <div className="mt-2 text-[0.98rem] leading-7 text-muted-foreground">{children}</div>
    </aside>
  );
}
