import type { ReactNode } from "react";

type QuoteBlockProps = {
  source?: string;
  children: ReactNode;
};

export function QuoteBlock({ source, children }: QuoteBlockProps) {
  return (
    <figure className="not-prose my-7 border-l-2 border-foreground/25 py-1 pl-5">
      <blockquote className="text-[1.1rem] leading-9 tracking-[-0.01em] text-foreground/86">
        {children}
      </blockquote>
      {source ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">- {source}</figcaption>
      ) : null}
    </figure>
  );
}
