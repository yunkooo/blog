import { MdxCodeFrame, type MdxSize } from "@/components/mdx/mdx-primitives";

type FileTreeProps = {
  title?: string;
  code: string;
  size?: MdxSize;
};

export function FileTree({ title = "File tree", code, size = "md" }: FileTreeProps) {
  return <MdxCodeFrame title={title} code={code} variant="tree" size={size} />;
}
