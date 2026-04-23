import { normalizeCodeLines } from "@/components/mdx/mdx-utils";

type FileTreeProps = {
  title?: string;
  code: string;
};

export function FileTree({ title = "File tree", code }: FileTreeProps) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-[1.35rem] border border-border/80 bg-background">
      <figcaption className="border-b border-border/70 bg-muted/25 px-4 py-2.5 text-sm font-medium text-muted-foreground">
        {title}
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 text-[0.96rem] leading-8 text-foreground/85">
        <code>
          {normalizeCodeLines(code).map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              {line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
