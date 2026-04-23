import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type MiniCardGridProps = {
  items?: DelimitedItems;
};

export function MiniCardGrid({ items }: MiniCardGridProps) {
  const normalizedItems = normalizeDelimitedItems(items).map(parseMiniCardItem);

  return (
    <div className="not-prose my-7 grid gap-3 sm:grid-cols-2">
      {normalizedItems.map(({ title, description }) => (
        <section
          key={`${title}-${description}`}
          className="rounded-2xl border border-border/80 bg-muted/25 px-4 py-4"
        >
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description ? (
            <p className="mt-2 text-[0.96rem] leading-7 text-muted-foreground">{description}</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function parseMiniCardItem(item: string) {
  const separatorIndex = item.indexOf(":");

  if (separatorIndex === -1) {
    return {
      title: item,
      description: "",
    };
  }

  return {
    title: item.slice(0, separatorIndex).trim(),
    description: item.slice(separatorIndex + 1).trim(),
  };
}
