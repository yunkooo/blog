import {
  getMdxMarkerOutlineClassName,
  MdxBlockTitle,
  MdxCard,
  MdxList,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import type { DelimitedItems } from "@/components/mdx/mdx-utils";

type ChecklistProps = {
  title?: string;
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function Checklist({
  title = "체크리스트",
  items,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: ChecklistProps) {
  return (
    <MdxCard tone={tone} size={size} variant={variant}>
      <MdxBlockTitle tone={tone}>{title}</MdxBlockTitle>
      <MdxList
        items={items}
        className="mt-4"
        size={size}
        marker={
          <span
            className={joinClassNames(
              "mt-1 flex size-5 items-center justify-center rounded-md border bg-transparent text-[0.72rem] font-semibold",
              getMdxMarkerOutlineClassName(tone),
            )}
          >
            ✓
          </span>
        }
      />
    </MdxCard>
  );
}
