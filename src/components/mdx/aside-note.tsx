import type { ReactNode } from "react";
import {
  MdxBlockTitle,
  MdxCard,
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
    <MdxCard
      tone={tone}
      size={size}
      variant={variant}
      className="!my-5 !rounded-xl !px-4 !py-3"
    >
      <MdxBlockTitle tone={tone} className="mb-1.5 flex items-center gap-2 text-xs">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{title}</span>
      </MdxBlockTitle>
      <div className="text-[0.94rem] leading-7 text-foreground/76 dark:text-foreground/80">
        {children}
      </div>
    </MdxCard>
  );
}
