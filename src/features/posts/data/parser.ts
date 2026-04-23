import matter from "gray-matter";
import type { PostDetail, PostFrontmatter, RawFrontmatter } from "@/features/posts/data/types";

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

function getTextOnlyContent(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[{}()[\]"'=]/g, " ")
    .replace(/[#>*_\-]/g, " ")
    .trim();
}

function calculateWordCount(content: string) {
  const textOnly = getTextOnlyContent(content);

  if (textOnly.length === 0) {
    return 0;
  }

  return textOnly.split(/\s+/).length;
}

function calculateReadingTime(wordCount: number) {
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

function normalizeStringArrayField(
  value: unknown,
  field: "summary" | "relatedQuestions",
  slug: string,
) {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  throw new Error(`Post "${slug}" has an invalid "${field}" field.`);
}

function normalizeFaqField(value: unknown, slug: string) {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Post "${slug}" has an invalid "faq" field.`);
  }

  return value
    .map((item) => {
      if (
        typeof item !== "object" ||
        item === null ||
        !("question" in item) ||
        !("answer" in item) ||
        typeof item.question !== "string" ||
        typeof item.answer !== "string"
      ) {
        throw new Error(`Post "${slug}" has an invalid "faq" item.`);
      }

      return {
        question: item.question.trim(),
        answer: item.answer.trim(),
      };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

function normalizeTagsField(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((tag): tag is string => typeof tag === "string" && tag.length > 0);
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
    tags: normalizeTagsField(frontmatter.tags),
    summary: normalizeStringArrayField(frontmatter.summary, "summary", slug),
    faq: normalizeFaqField(frontmatter.faq, slug),
    relatedQuestions: normalizeStringArrayField(
      frontmatter.relatedQuestions,
      "relatedQuestions",
      slug,
    ),
    featured: frontmatter.featured === true,
    draft: frontmatter.draft === true,
  };
}

export function parsePostFile(filename: string, source: string): PostDetail {
  const slug = getSlugFromFilename(filename);
  const { data, content } = matter(source);
  const frontmatter = normalizeFrontmatter(data as RawFrontmatter, slug);
  const wordCount = calculateWordCount(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    category: frontmatter.category,
    tags: frontmatter.tags,
    summary: frontmatter.summary,
    faq: frontmatter.faq,
    relatedQuestions: frontmatter.relatedQuestions,
    featured: frontmatter.featured ?? false,
    draft: frontmatter.draft ?? false,
    content,
    readingTimeText: calculateReadingTime(wordCount),
    wordCount,
  };
}
