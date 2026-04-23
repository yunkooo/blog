type DefinitionBoxProps = {
  term: string;
  description: string;
};

export function DefinitionBox({ term, description }: DefinitionBoxProps) {
  return (
    <aside className="not-prose my-6 rounded-[1.35rem] border border-border/80 bg-background px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Definition
      </p>
      <dl className="mt-3">
        <dt className="text-lg font-medium leading-8 tracking-[-0.01em] text-foreground">{term}</dt>
        <dd className="mt-2 text-[1rem] leading-8 text-muted-foreground">{description}</dd>
      </dl>
    </aside>
  );
}
