import { MdxCodeFrame, type MdxSize } from "@/components/mdx/mdx-primitives";

type CodePanelProps = {
  title: string;
  language?: string;
  code: string;
  size?: MdxSize;
};

export function CodePanel({ title, language, code, size = "md" }: CodePanelProps) {
  return <MdxCodeFrame title={title} meta={language} code={code} size={size} />;
}
