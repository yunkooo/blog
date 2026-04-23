import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const postsDirectory = process.env.POSTS_DIR
  ? path.resolve(process.env.POSTS_DIR)
  : path.join(process.cwd(), "content-source", "posts");

function getSlugFromFilename(filename) {
  return filename.replace(/\.mdx$/, "");
}

function formatFieldValue(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateStringField(data, field, errors) {
  const value = data[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`"${field}" must be a non-empty string.`);
  }
}

function getRawFrontmatterField(rawFrontmatter, field) {
  const match = rawFrontmatter.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));

  return match?.[1];
}

function unwrapQuotedValue(value) {
  const trimmedValue = value.trim();
  const quotedValue = trimmedValue.match(/^["'](.*)["']$/);

  return quotedValue ? quotedValue[1] : trimmedValue;
}

function validateDateField(data, field, errors, rawFrontmatter) {
  const value = data[field];

  if (value === undefined) {
    errors.push(`"${field}" is required.`);
    return;
  }

  const rawValue = getRawFrontmatterField(rawFrontmatter, field);
  const normalizedValue =
    rawValue !== undefined
      ? unwrapQuotedValue(rawValue)
      : value instanceof Date && !Number.isNaN(value.getTime())
        ? value.toISOString().slice(0, 10)
        : typeof value === "string"
          ? value.trim()
          : "";

  if (!isValidDateString(normalizedValue)) {
    errors.push(`"${field}" must be a valid YYYY-MM-DD date.`);
  }
}

function validateTags(data, errors) {
  if (!Array.isArray(data.tags)) {
    errors.push('"tags" must be an array.');
    return;
  }

  data.tags.forEach((tag, index) => {
    if (typeof tag !== "string" || tag.trim().length === 0) {
      errors.push(`"tags[${index}]" must be a non-empty string.`);
    }
  });
}

function validateBooleanField(data, field, errors) {
  if (typeof data[field] !== "boolean") {
    errors.push(`"${field}" must be a boolean.`);
  }
}

function validateOptionalBooleanField(data, field, errors) {
  if (data[field] !== undefined && typeof data[field] !== "boolean") {
    errors.push(`"${field}" must be a boolean when provided.`);
  }
}

function validateFrontmatter(data, rawFrontmatter) {
  const errors = [];

  validateStringField(data, "title", errors);
  validateStringField(data, "description", errors);
  validateDateField(data, "publishedAt", errors, rawFrontmatter);
  validateStringField(data, "category", errors);
  validateTags(data, errors);
  validateBooleanField(data, "draft", errors);
  validateOptionalBooleanField(data, "featured", errors);

  if (data.updatedAt !== undefined) {
    validateDateField(data, "updatedAt", errors, rawFrontmatter);
  }

  return errors;
}

export async function readPostFiles() {
  let entries;

  try {
    entries = await fs.readdir(postsDirectory, { withFileTypes: true });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Posts directory is unavailable at ${postsDirectory}. Details: ${details}`);
  }

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
}

export async function validatePosts() {
  const filenames = await readPostFiles();
  const slugMap = new Map();
  const issues = [];
  const posts = [];

  for (const filename of filenames) {
    const slug = getSlugFromFilename(filename);
    const normalizedSlug = slug.toLowerCase();
    const filePath = path.join(postsDirectory, filename);
    const source = await fs.readFile(filePath, "utf8");
    const { data, matter: rawFrontmatter } = matter(source);
    const errors = validateFrontmatter(data, rawFrontmatter);

    if (slugMap.has(normalizedSlug)) {
      errors.push(`slug duplicates "${slugMap.get(normalizedSlug)}".`);
    }

    slugMap.set(normalizedSlug, slug);

    if (errors.length > 0) {
      issues.push({ filename, errors });
    }

    posts.push({
      filename,
      slug,
      title: typeof data.title === "string" ? data.title : "",
      description: typeof data.description === "string" ? data.description : "",
      publishedAt:
        data.publishedAt === undefined ? "" : formatFieldValue(data.publishedAt).slice(0, 10),
      updatedAt: data.updatedAt === undefined ? undefined : formatFieldValue(data.updatedAt).slice(0, 10),
      category: typeof data.category === "string" ? data.category : "",
      tags: Array.isArray(data.tags) ? data.tags.filter((tag) => typeof tag === "string") : [],
      draft: data.draft === true,
      featured: data.featured === true,
    });
  }

  return { posts, issues };
}

export function printValidationIssues(issues) {
  console.error("Post validation failed:");

  for (const issue of issues) {
    console.error(`\n${issue.filename}`);

    for (const error of issue.errors) {
      console.error(`  - ${error}`);
    }
  }
}
