import {
  getMdxMarkerClassName,
  MdxList,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  getMdxToneClassName,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import type { DelimitedItems } from "@/components/mdx/mdx-utils";

type StepListProps = {
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function StepList({
  items,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: StepListProps) {
  return (
    <MdxList
      items={items}
      ordered
      className="not-prose my-6 space-y-3"
      size={size}
      itemClassName={joinClassNames(
        "rounded-2xl border px-4 py-3",
        getMdxToneClassName(tone, variant),
      )}
      marker={(_, index) => (
        <span
          className={joinClassNames(
            "flex h-7 w-7 min-w-7 shrink-0 aspect-square items-center justify-center rounded-full border text-sm font-medium",
            getMdxMarkerClassName(tone),
          )}
        >
          {index + 1}
        </span>
      )}
    />
  );
}
