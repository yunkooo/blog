import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type ChecklistProps = {
  title?: string;
  items?: DelimitedItems;
};

export function Checklist({ title = "체크리스트", items }: ChecklistProps) {
  const normalizedItems = normalizeDelimitedItems(items);

  return (
    <section className="not-prose my-6 rounded-[1.35rem] border border-border/80 bg-background px-5 py-4">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 grid gap-3">
        {normalizedItems.map((item) => (
          <li key={item} className="flex gap-3 text-[1rem] leading-7 text-foreground/80">
            <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border border-foreground/20 bg-muted/45 text-[0.72rem] font-semibold text-foreground">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
