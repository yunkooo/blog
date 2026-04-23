type StepListProps = {
  items: string[];
};

export function StepList({ items }: StepListProps) {
  return (
    <ol className="not-prose my-6 space-y-3">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="flex gap-3 rounded-2xl border border-border/80 bg-background px-4 py-3"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
            {index + 1}
          </span>
          <span className="pt-0.5 text-[1rem] leading-7 text-foreground/80">{item}</span>
        </li>
      ))}
    </ol>
  );
}
