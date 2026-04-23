import type { ReactNode } from "react";

type CalloutTone = "info" | "note" | "warning" | "success";

const toneStyles: Record<CalloutTone, string> = {
  info: "border-foreground/15 bg-muted/55 text-foreground",
  note: "border-border bg-background text-foreground",
  warning:
    "border-amber-500/25 bg-amber-500/10 text-foreground dark:border-amber-300/25 dark:bg-amber-300/10",
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-foreground dark:border-emerald-300/25 dark:bg-emerald-300/10",
};

const toneLabels: Record<CalloutTone, string> = {
  info: "Info",
  note: "Note",
  warning: "Warning",
  success: "Summary",
};

export function Callout({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: CalloutTone;
}) {
  return (
    <aside className={`rounded-2xl border px-5 py-4 ${toneStyles[tone]}`}>
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {toneLabels[tone]}
      </p>
      <div className="space-y-2 text-[1rem] leading-8 text-foreground/80">{children}</div>
    </aside>
  );
}
