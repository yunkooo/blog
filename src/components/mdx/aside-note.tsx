import type { ReactNode } from "react";
import {
  MdxHighlight,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";

type AsideNoteProps = {
  title?: string;
  children: ReactNode;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
  icon?: ReactNode;
};

export function AsideNote({
  title = "참고",
  children,
  tone = "neutral",
  size = "sm",
  variant = "dashed",
  icon,
}: AsideNoteProps) {
  return (
    <MdxHighlight title={title} tone={tone} size={size} variant={variant} icon={icon}>
      {children}
    </MdxHighlight>
  );
}
