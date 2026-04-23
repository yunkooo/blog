import type { ReactNode } from "react";
import {
  MdxHighlight,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";

type SpotlightProps = {
  title?: string;
  children: ReactNode;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant | "strong";
  icon?: ReactNode;
};

export function Spotlight({
  title = "핵심",
  children,
  tone = "neutral",
  size = "lg",
  variant = "strong",
  icon,
}: SpotlightProps) {
  return (
    <MdxHighlight title={title} tone={tone} size={size} variant={variant} icon={icon}>
      {children}
    </MdxHighlight>
  );
}
