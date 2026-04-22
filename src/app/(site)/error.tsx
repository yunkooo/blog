"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex flex-1 items-center py-16 sm:py-24">
      <section className="w-full border-y border-border/80 py-10 sm:py-12">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Error</p>
        <h1 className="mt-4 text-[1.9rem] font-semibold tracking-tight sm:text-[2.5rem]">
          잠시 문제가 생겼습니다
        </h1>
        <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
          페이지를 불러오는 중 예상하지 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        {error.digest ? (
          <p className="mt-3 text-sm text-muted-foreground/80">오류 식별자: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-8 inline-flex rounded-full border border-border/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          다시 시도하기
        </button>
      </section>
    </main>
  );
}
