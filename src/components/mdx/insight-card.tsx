import type { ReactNode } from "react";
import {
  MdxBlockTitle,
  getMdxToneTextClassName,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";

type InsightCardProps = {
  title?: string;
  children: ReactNode;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant | "minimal";
  icon?: ReactNode;
};

export function InsightCard({
  title = "배운 점",
  children,
  tone = "neutral",
  size = "md",
  variant = "plain",
  icon = "✦",
}: InsightCardProps) {
  void size;
  void variant;

  return (
    <aside className="not-prose my-7 flex gap-3">
      <span
        aria-hidden="true"
        className={joinClassNames("mt-1.5 shrink-0 text-sm", getMdxToneTextClassName(tone))}
      >
        {icon}
      </span>
      <div>
        <MdxBlockTitle tone={tone} className="mb-2 text-xs tracking-[0.18em]">
          {title}
        </MdxBlockTitle>
        <div className="text-[1.02rem] leading-8 text-foreground/80">{children}</div>
      </div>
    </aside>
  );
}
