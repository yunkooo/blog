import { postsDirectory, printValidationIssues, validatePosts } from "./post-validation.mjs";

const { posts, issues } = await validatePosts();

if (issues.length > 0) {
  printValidationIssues(issues);
  process.exit(1);
}

console.log(`Post validation passed: ${posts.length} file(s) checked in ${postsDirectory}.`);
