import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTimeText: string;
};

export type PostDetail = PostSummary & {
  content: string;
};

const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => {
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
  pre: (props) => <pre {...props} />,
  code: (props) => <code {...props} />,
};

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

function calculateReadingTime(content: string) {
  const textOnly = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_\-]/g, " ")
    .trim();

  const wordCount = textOnly.length === 0 ? 0 : textOnly.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function parsePostFile(filename: string, source: string): PostDetail {
  const slug = getSlugFromFilename(filename);
  const { data, content } = matter(source);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    featured: frontmatter.featured ?? false,
    draft: frontmatter.draft ?? false,
    content,
    readingTimeText: calculateReadingTime(content),
  };
}

async function getPostFilenames() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

export async function getAllPosts() {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const source = await fs.readFile(filePath, "utf8");
      return parsePostFile(filename, source);
    }),
  );

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getAllPosts();
  const featured = posts.filter((post) => post.featured);
  return (featured.length > 0 ? featured : posts).slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const post = parsePostFile(`${slug}.mdx`, source);

    if (post.draft) {
      notFound();
    }

    return post;
  } catch {
    notFound();
  }
}

export async function getPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function renderPostContent(source: string) {
  const evaluated = await evaluate(source, {
    ...runtime,
  });

  const Content = evaluated.default;
  return <Content components={mdxComponents} />;
}

export function formatKoreanDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
