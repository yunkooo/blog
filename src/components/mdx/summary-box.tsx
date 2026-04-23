import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type SummaryBoxProps = {
  title?: string;
  items?: DelimitedItems;
};

export function SummaryBox({ title = "정리", items }: SummaryBoxProps) {
  const normalizedItems = normalizeDelimitedItems(items);

  return (
    <aside className="not-prose my-7 rounded-[1.35rem] border border-foreground/10 bg-muted/40 px-5 py-5">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 grid gap-2.5">
        {normalizedItems.map((item) => (
          <li key={item} className="flex gap-3 text-[1rem] leading-7 text-foreground/82">
            <span className="mt-[0.58rem] size-1.5 shrink-0 rounded-full bg-foreground/55" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
