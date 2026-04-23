import {
  getMdxMarkerClassName,
  MdxBlockTitle,
  MdxCard,
  MdxList,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import type { DelimitedItems } from "@/components/mdx/mdx-utils";

type SummaryBoxProps = {
  title?: string;
  items?: DelimitedItems;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function SummaryBox({
  title = "정리",
  items,
  tone = "neutral",
  size = "md",
  variant = "soft",
}: SummaryBoxProps) {
  return (
    <MdxCard tone={tone} size={size} variant={variant} className="my-7">
      <MdxBlockTitle tone={tone} className="tracking-[0.18em]">
        {title}
      </MdxBlockTitle>
      <MdxList
        items={items}
        className="mt-4 gap-2.5"
        size={size}
        marker={
          <span
            className={joinClassNames(
              "mt-[0.58rem] block size-1.5 rounded-full border",
              getMdxMarkerClassName(tone),
            )}
          />
        }
      />
    </MdxCard>
  );
}
