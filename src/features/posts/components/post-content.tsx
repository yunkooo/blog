import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  AsideNote,
  Callout,
  Checklist,
  CodePanel,
  CompareBox,
  DefinitionBox,
  DoDont,
  FileTree,
  ImageFrame,
  InsightCard,
  KeyPoint,
  LeadText,
  MermaidDiagram,
  MiniCardGrid,
  QuoteBlock,
  ResourceLinks,
  SectionBreak,
  Spotlight,
  StepList,
  SummaryBox,
  TerminalBlock,
  Timeline,
  ToolGrid,
} from "@/components/mdx";
import { rehypeMermaidCodeBlocks } from "@/features/posts/components/rehype-mermaid-code-blocks";

const mdxComponents = {
  AsideNote,
  Callout,
  Checklist,
  CodePanel,
  CompareBox,
  DefinitionBox,
  DoDont,
  FileTree,
  ImageFrame,
  InsightCard,
  KeyPoint,
  LeadText,
  MermaidDiagram,
  MiniCardGrid,
  QuoteBlock,
  ResourceLinks,
  SectionBreak,
  Spotlight,
  StepList,
  SummaryBox,
  TerminalBlock,
  Timeline,
  ToolGrid,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    return (
      <a
        href={href}
        {...props}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
      />
    );
  },
};

const mdxRemoteOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
      rehypeMermaidCodeBlocks,
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          defaultLang: "plaintext",
          theme: {
            light: "github-light-high-contrast",
            dark: "github-dark-high-contrast",
          },
        },
      ],
    ],
  },
};

export async function renderPostContent(source: string) {
  return <MDXRemote source={source} components={mdxComponents} options={mdxRemoteOptions} />;
}
