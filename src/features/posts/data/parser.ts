import matter from "gray-matter";
import type { PostDetail, PostFrontmatter, RawFrontmatter } from "@/features/posts/data/types";

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

function readRequiredStringField(
  frontmatter: RawFrontmatter,
  field: keyof PostFrontmatter,
  slug: string,
) {
  const value = frontmatter[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Post "${slug}" is missing a valid "${field}" field.`);
  }

  return value;
}

function normalizeDateField(value: unknown, field: "publishedAt" | "updatedAt", slug: string) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error(`Post "${slug}" is missing a valid "${field}" field.`);
}

function normalizeFrontmatter(frontmatter: RawFrontmatter, slug: string): PostFrontmatter {
  const publishedAt = normalizeDateField(frontmatter.publishedAt, "publishedAt", slug);

  if (!publishedAt) {
    throw new Error(`Post "${slug}" is missing a valid "publishedAt" field.`);
  }

  return {
    title: readRequiredStringField(frontmatter, "title", slug),
    description: readRequiredStringField(frontmatter, "description", slug),
    publishedAt,
    category: readRequiredStringField(frontmatter, "category", slug),
    updatedAt: normalizeDateField(frontmatter.updatedAt, "updatedAt", slug),
    tags: Array.isArray(frontmatter.tags)
      ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string" && tag.length > 0)
      : [],
    featured: frontmatter.featured === true,
    draft: frontmatter.draft === true,
  };
}

export function parsePostFile(filename: string, source: string): PostDetail {
  const slug = getSlugFromFilename(filename);
  const { data, content } = matter(source);
  const frontmatter = normalizeFrontmatter(data as RawFrontmatter, slug);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    category: frontmatter.category,
    tags: frontmatter.tags,
    featured: frontmatter.featured ?? false,
    draft: frontmatter.draft ?? false,
    content,
    readingTimeText: calculateReadingTime(content),
  };
}
