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
    <aside className="not-prose my-7">
      <MdxBlockTitle
        tone={tone}
        className="mb-2 flex items-center gap-2 text-xs tracking-[0.18em]"
      >
        {icon ? (
          <span aria-hidden="true" className={joinClassNames("text-sm", getMdxToneTextClassName(tone))}>
            {icon}
          </span>
        ) : null}
        <span>{title}</span>
      </MdxBlockTitle>
      <div className="text-[1.02rem] leading-8 text-foreground/80">
        {children}
      </div>
    </aside>
  );
}
