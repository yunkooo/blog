type CompareBoxProps = {
  leftTitle: string;
  rightTitle: string;
  leftItems?: string[] | string;
  rightItems?: string[] | string;
};

export function CompareBox({ leftTitle, rightTitle, leftItems, rightItems }: CompareBoxProps) {
  return (
    <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
      <CompareColumn title={leftTitle} items={leftItems} />
      <CompareColumn title={rightTitle} items={rightItems} />
    </div>
  );
}

function CompareColumn({ title, items }: { title: string; items: string[] | string | undefined }) {
  const normalizedItems = normalizeItems(items);

  return (
    <section className="rounded-2xl border border-border/80 bg-background px-4 py-4">
      <h4 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {normalizedItems.map((item) => (
          <li key={item} className="text-[0.98rem] leading-7 text-foreground/78">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function normalizeItems(items: string[] | string | undefined) {
  if (Array.isArray(items)) {
    return items;
  }

  if (typeof items === "string") {
    return items
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}
