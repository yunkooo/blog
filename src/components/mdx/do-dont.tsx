import {
  getMdxMarkerOutlineClassName,
  MdxBlockTitle,
  MdxCard,
  MdxList,
  type MdxSize,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";
import type { DelimitedItems } from "@/components/mdx/mdx-utils";

type DoDontProps = {
  doItems?: DelimitedItems;
  dontItems?: DelimitedItems;
  doTitle?: string;
  dontTitle?: string;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function DoDont({
  doItems,
  dontItems,
  doTitle = "Do",
  dontTitle = "Don't",
  size = "md",
  variant = "soft",
}: DoDontProps) {
  return (
    <div className="not-prose my-7 grid gap-3 md:grid-cols-2">
      <MdxCard as="section" tone="success" size={size} variant={variant} className="my-0">
        <MdxBlockTitle tone="success">{doTitle}</MdxBlockTitle>
        <MdxList items={doItems} className="mt-4" size={size} marker={<Marker tone="success">✓</Marker>} />
      </MdxCard>
      <MdxCard as="section" tone="danger" size={size} variant={variant} className="my-0">
        <MdxBlockTitle tone="danger">{dontTitle}</MdxBlockTitle>
        <MdxList items={dontItems} className="mt-4" size={size} marker={<Marker tone="danger">×</Marker>} />
      </MdxCard>
    </div>
  );
}

function Marker({ children, tone }: { children: string; tone: "success" | "danger" }) {
  return (
    <span
      className={joinClassNames(
        "mt-1 flex size-5 items-center justify-center rounded-full border bg-transparent text-[0.72rem] font-semibold",
        getMdxMarkerOutlineClassName(tone),
      )}
    >
      {children}
    </span>
  );
}
