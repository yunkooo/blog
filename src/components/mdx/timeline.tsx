import {
  getMdxMarkerOutlineClassName,
  getMdxToneTextClassName,
  joinClassNames,
  type MdxSize,
  type MdxToneInput,
} from "@/components/mdx/mdx-primitives";
import { normalizeDelimitedItems, type DelimitedItems } from "@/components/mdx/mdx-utils";

type TimelineProps = {
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: "plain" | "soft" | "outline" | "dashed" | "solid";
};

export function Timeline({
  items,
  tone = "neutral",
  size = "md",
  variant,
}: TimelineProps) {
  void variant;

  const steps = normalizeDelimitedItems(items);
  const contentClassName = size === "sm" ? "text-[0.96rem] leading-7" : "text-[1rem] leading-7";

  return (
    <ol className="not-prose my-7 grid list-none gap-0 p-0">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
          <div className="flex flex-col items-center">
            <span
              className={joinClassNames(
                "flex h-7 w-7 min-w-7 shrink-0 aspect-square items-center justify-center rounded-full border bg-transparent text-sm font-medium",
                getMdxMarkerOutlineClassName(tone),
              )}
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span
                className={joinClassNames(
                  "h-full min-h-6 w-px opacity-55",
                  tone === "neutral" || tone === "note"
                    ? "bg-border"
                    : getMdxToneTextClassName(tone),
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
