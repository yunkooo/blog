import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Callout, CompareBox, KeyPoint, StepList } from "@/components/mdx";

const mdxComponents = {
  Callout,
  CompareBox,
  KeyPoint,
  StepList,
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
      [rehypePrettyCode, { keepBackground: false, defaultLang: "plaintext" }],
    ],
  },
};

export async function renderPostContent(source: string) {
  return <MDXRemote source={source} components={mdxComponents} options={mdxRemoteOptions} />;
}
