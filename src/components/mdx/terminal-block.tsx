import { normalizeCodeLines } from "@/components/mdx/mdx-utils";

type TerminalBlockProps = {
  title?: string;
  code: string;
};

export function TerminalBlock({ title = "Terminal", code }: TerminalBlockProps) {
  const lines = normalizeCodeLines(code);

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-[1.35rem] border border-foreground/10 bg-foreground text-background">
      <figcaption className="flex items-center gap-2 border-b border-background/10 px-4 py-3 text-sm text-background/70">
        <span className="size-2.5 rounded-full bg-red-400/85" />
        <span className="size-2.5 rounded-full bg-amber-300/85" />
        <span className="size-2.5 rounded-full bg-emerald-400/85" />
        <span className="ml-2">{title}</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 text-[0.95rem] leading-7">
        <code>
          {lines.map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              <span className="select-none text-background/45">$ </span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
