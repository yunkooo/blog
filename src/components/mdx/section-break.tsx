type SectionBreakProps = {
  label?: string;
};

export function SectionBreak({ label }: SectionBreakProps) {
  return (
    <div className="not-prose my-10 flex items-center gap-4 text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {label ? (
        <span className="max-w-[70%] text-center text-xs font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
      ) : (
        <span className="text-lg leading-none">···</span>
      )}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
