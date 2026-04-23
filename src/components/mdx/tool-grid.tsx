import {
  MdxItemGrid,
  type MdxColumns,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";
import {
  normalizeDelimitedItems,
  parseTitleDescriptionItem,
  type DelimitedItems,
} from "@/components/mdx/mdx-utils";

type ToolGridProps = {
  items?: DelimitedItems;
  columns?: MdxColumns;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function ToolGrid({
  items,
  columns = 2,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: ToolGridProps) {
  const tools = normalizeDelimitedItems(items).map(parseTitleDescriptionItem);

  return (
    <MdxItemGrid items={tools} columns={columns} tone={tone} size={size} variant={variant} />
  );
}
