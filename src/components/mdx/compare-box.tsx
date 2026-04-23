import {
  MdxBlockTitle,
  MdxCard,
  MdxList,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";
import type { DelimitedItems } from "@/components/mdx/mdx-utils";

type CompareBoxProps = {
  leftTitle: string;
  rightTitle: string;
  leftItems?: DelimitedItems;
  rightItems?: DelimitedItems;
  leftTone?: MdxToneInput;
  rightTone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function CompareBox({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftTone = "neutral",
  rightTone = "neutral",
  size = "md",
  variant = "plain",
}: CompareBoxProps) {
  return (
    <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
      <CompareColumn title={leftTitle} items={leftItems} tone={leftTone} size={size} variant={variant} />
      <CompareColumn title={rightTitle} items={rightItems} tone={rightTone} size={size} variant={variant} />
    </div>
  );
}

function CompareColumn({
  title,
  items,
  tone,
  size,
  variant,
}: {
  title: string;
  items: DelimitedItems;
  tone: MdxToneInput;
  size: MdxSize;
  variant: MdxVariant;
}) {
  return (
    <MdxCard tone={tone} size={size} variant={variant} className="my-0 rounded-2xl">
      <MdxBlockTitle tone={tone}>{title}</MdxBlockTitle>
      <MdxList items={items} className="mt-3 gap-2" itemClassName="text-[0.98rem] leading-7" size={size} />
    </MdxCard>
  );
}
