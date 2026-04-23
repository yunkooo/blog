import { execFileSync } from "node:child_process";
import { postsDirectory, printValidationIssues, validatePosts } from "./post-validation.mjs";

function readGitRef(args, cwd = process.cwd()) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unavailable";
  }
}

function getRecordedPostsPointer() {
  return readGitRef(["rev-parse", "HEAD:content-source/posts"]);
}

function getCurrentPostsPointer() {
  return readGitRef(["rev-parse", "HEAD"], postsDirectory);
}

const { posts, issues } = await validatePosts();

if (issues.length > 0) {
  printValidationIssues(issues);
  process.exit(1);
}

const publicPosts = posts
  .filter((post) => !post.draft)
  .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));
const draftPosts = posts.filter((post) => post.draft);
const latestPosts = publicPosts.slice(0, 5);
const recordedPostsPointer = getRecordedPostsPointer();
const currentPostsPointer = getCurrentPostsPointer();
const hasPointerMismatch =
  recordedPostsPointer !== "unavailable" &&
  currentPostsPointer !== "unavailable" &&
  recordedPostsPointer !== currentPostsPointer;

console.log("Publish check");
console.log(`- posts directory: ${postsDirectory}`);
console.log(`- recorded posts pointer: ${recordedPostsPointer}`);
console.log(`- current posts checkout: ${currentPostsPointer}`);
console.log(`- public posts: ${publicPosts.length}`);
console.log(`- draft posts: ${draftPosts.length}`);

if (hasPointerMismatch) {
  console.log("- warning: current posts checkout differs from the parent repo pointer.");
  console.log("  Commit the content-source/posts pointer in the blog repo before publishing.");
}

if (latestPosts.length > 0) {
  console.log("- latest public posts:");

  for (const post of latestPosts) {
    console.log(`  - ${post.publishedAt} ${post.slug} (${post.title})`);
  }
}
