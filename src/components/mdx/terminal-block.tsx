import { MdxCodeFrame, type MdxSize } from "@/components/mdx/mdx-primitives";

type TerminalBlockProps = {
  title?: string;
  code: string;
  size?: MdxSize;
};

export function TerminalBlock({ title = "Terminal", code, size = "md" }: TerminalBlockProps) {
  return <MdxCodeFrame title={title} code={code} variant="terminal" size={size} />;
}
