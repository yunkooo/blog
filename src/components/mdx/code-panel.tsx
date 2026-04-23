import { normalizeCodeLines } from "@/components/mdx/mdx-utils";

type CodePanelProps = {
  title: string;
  language?: string;
  code: string;
};

export function CodePanel({ title, language, code }: CodePanelProps) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-[1.35rem] border border-border/80 bg-background">
      <figcaption className="flex items-center justify-between border-b border-border/70 bg-muted/30 px-4 py-2.5">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {language ? (
          <span className="rounded-full bg-background px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {language}
          </span>
        ) : null}
      </figcaption>
      <pre className="overflow-x-auto bg-muted/20 px-4 py-4 text-[0.96rem] leading-7 text-foreground">
        <code>{normalizeCodeLines(code).join("\n")}</code>
      </pre>
    </figure>
  );
}
