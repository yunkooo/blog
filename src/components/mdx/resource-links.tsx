import {
  MdxBlockTitle,
  MdxCard,
  getMdxToneClassName,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import {
  normalizeDelimitedItems,
  parseLabelUrlItem,
  type DelimitedItems,
} from "@/components/mdx/mdx-utils";

type ResourceLinksProps = {
  title?: string;
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function ResourceLinks({
  title = "관련 문서",
  items,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: ResourceLinksProps) {
  const links = normalizeDelimitedItems(items).map(parseLabelUrlItem);

  return (
    <MdxCard tone={tone} size={size} variant={variant}>
      <MdxBlockTitle tone={tone}>{title}</MdxBlockTitle>
      <ul className="mt-4 grid list-none gap-2.5 p-0">
        {links.map(({ label, href }) => (
          <li key={`${label}-${href}`}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              className={joinClassNames(
                "group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-[0.98rem] text-foreground/82 !no-underline transition-colors hover:bg-muted/45 hover:!no-underline",
                getMdxToneClassName(tone, "soft"),
              )}
            >
              <span>{label}</span>
              <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </MdxCard>
  );
}
