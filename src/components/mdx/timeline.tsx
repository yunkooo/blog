import {
  getMdxMarkerClassName,
  getMdxToneClassName,
  joinClassNames,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";
import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type TimelineProps = {
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function Timeline({
  items,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: TimelineProps) {
  const steps = normalizeDelimitedItems(items);
  const contentClassName = size === "sm" ? "text-[0.96rem] leading-7" : "text-[1rem] leading-7";

  return (
    <ol className="not-prose my-7 grid list-none gap-0 p-0">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
          <div className="flex flex-col items-center">
            <span
              className={joinClassNames(
                "flex size-7 items-center justify-center rounded-full border text-sm font-medium",
                getMdxMarkerClassName(tone, variant !== "solid"),
              )}
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span
                className={joinClassNames(
                  "h-full min-h-6 w-px",
                  tone === "neutral" || tone === "note" ? "bg-border" : getMdxToneClassName(tone, "soft"),
                )}
              />
            ) : null}
          </div>
          <p className={joinClassNames("pb-5 pt-0.5 text-foreground/82", contentClassName)}>
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}
