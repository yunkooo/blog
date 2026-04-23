import type { ReactNode } from "react";

type LeadTextProps = {
  children: ReactNode;
};

export function LeadText({ children }: LeadTextProps) {
  return (
    <p className="not-prose my-7 text-[1.18rem] font-medium leading-9 tracking-[-0.01em] text-foreground/88 sm:text-[1.28rem] sm:leading-10">
      {children}
    </p>
  );
}
