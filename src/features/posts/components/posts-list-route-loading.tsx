import { PostsListLoadingSkeleton } from "@/features/posts/components/posts-list-loading-skeleton";

export function PostsListRouteLoading() {
  return (
    <main
      className="mx-auto w-full max-w-4xl flex-1 py-8 sm:py-10"
      role="status"
      aria-label="글 목록을 불러오는 중"
    >
      <PostsListLoadingSkeleton />
    </main>
  );
}
