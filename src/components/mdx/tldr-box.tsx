import {
  type MdxSize,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type TldrBoxProps = {
  title?: string;
  items?: DelimitedItems;
  size?: MdxSize;
};

const textSizeClasses: Record<MdxSize, string> = {
  sm: "text-[0.95rem] leading-7",
  md: "text-[1rem] leading-8",
  lg: "text-[1.05rem] leading-8",
};

export function TldrBox({ title = "TL;DR", items, size = "md" }: TldrBoxProps) {
  const normalizedItems = normalizeDelimitedItems(items);

  if (normalizedItems.length === 0) {
    return null;
  }

  return (
    <section className="not-prose my-7">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </span>
      </div>

      <ul className={joinClassNames("grid list-none gap-2.5 p-0", textSizeClasses[size])}>
        {normalizedItems.map((item, index) => (
          <li key={`${index}-${item}`} className="flex gap-3 text-foreground/82">
            <span
              className="mt-[0.78rem] block size-1.5 shrink-0 rounded-full bg-muted-foreground/55"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
