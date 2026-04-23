import { PostsListLoadingSkeleton } from "@/features/posts/components/posts-list-loading-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 py-8 sm:py-10">
      <PostsListLoadingSkeleton />
    </main>
  );
}
