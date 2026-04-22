import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { parsePostFile } from "@/features/posts/data/parser";

const defaultPostsDirectory = "content-source/posts";

function resolvePostsDirectory() {
  const configuredDirectory = process.env.POSTS_DIR?.trim() || defaultPostsDirectory;
  return path.isAbsolute(configuredDirectory)
    ? configuredDirectory
    : path.join(process.cwd(), configuredDirectory);
}

async function ensurePostsDirectoryExists(postsDirectory: string) {
  try {
    const stats = await fs.stat(postsDirectory);

    if (!stats.isDirectory()) {
      throw new Error(
        `Configured POSTS_DIR is not a directory: ${postsDirectory}. ` +
          "Point POSTS_DIR to the checked-out post repository path.",
      );
    }
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error";

    throw new Error(
      `Posts directory is unavailable at ${postsDirectory}. ` +
        "Add the posts submodule at content-source/posts or set POSTS_DIR to a valid directory. " +
        `Details: ${details}`,
    );
  }
}

async function getPostFilenames() {
  const postsDirectory = resolvePostsDirectory();
  await ensurePostsDirectoryExists(postsDirectory);
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

export async function getAllPosts() {
  const postsDirectory = resolvePostsDirectory();
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

export async function getPostBySlug(slug: string) {
  const postsDirectory = resolvePostsDirectory();
  await ensurePostsDirectoryExists(postsDirectory);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const post = parsePostFile(`${slug}.mdx`, source);

    if (post.draft) {
      notFound();
    }

    return post;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      notFound();
    }

    throw error;
  }
}

export async function getPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
