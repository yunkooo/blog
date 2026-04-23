import type { ReactNode } from "react";
import {
  MdxHighlight,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
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
  return (
    <MdxHighlight title={title} icon={icon} tone={tone} size={size} variant={variant}>
      {children}
    </MdxHighlight>
  );
}
