import type { ReactNode } from "react";
import {
  MdxHighlight,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";

type KeyPointProps = {
  title: string;
  children: ReactNode;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
  icon?: ReactNode;
};

export function KeyPoint({
  title,
  children,
  tone = "info",
  size = "md",
  variant = "soft",
  icon = "💡",
}: KeyPointProps) {
  return (
    <MdxHighlight title={title} icon={icon} tone={tone} size={size} variant={variant}>
      {children}
    </MdxHighlight>
  );
}
