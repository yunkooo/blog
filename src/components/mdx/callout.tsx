import type { ReactNode } from "react";
import {
  MdxBlockTitle,
  MdxCard,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
} from "@/components/mdx/mdx-primitives";

type CalloutTone = MdxToneInput;

const toneLabels: Record<CalloutTone, string> = {
  neutral: "Note",
  info: "Info",
  note: "Note",
  warning: "Warning",
  success: "Summary",
  danger: "Caution",
};

export function Callout({
  children,
  tone = "info",
  size = "md",
  variant = "soft",
  title,
}: {
  children: ReactNode;
  tone?: CalloutTone;
  size?: MdxSize;
  variant?: MdxVariant;
  title?: string;
}) {
  return (
    <MdxCard
      tone={tone}
      size={size}
      variant={variant}
      className="!rounded-xl !border-l-4 !bg-background !px-4 !py-3"
    >
      <MdxBlockTitle tone={tone} className="mb-1.5 tracking-[0.18em]">
        {title ?? toneLabels[tone]}
      </MdxBlockTitle>
      <div className="space-y-2 text-[0.98rem] leading-7 text-foreground/80">{children}</div>
    </MdxCard>
  );
}
