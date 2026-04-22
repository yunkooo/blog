export default function PostDetailLoading() {
  return (
    <main className="flex-1 py-8 sm:py-10">
      <article className="px-0 py-1 sm:py-2" aria-label="글을 불러오는 중">
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />

        <header className="mt-4 border-b border-border pb-6 sm:pb-7">
          <div className="flex animate-pulse flex-wrap items-center gap-2.5">
            <div className="h-7 w-28 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted/80" />
            <div className="h-4 w-16 rounded bg-muted/80" />
          </div>

          <div className="mt-4 animate-pulse space-y-3">
            <div className="h-9 w-11/12 rounded-lg bg-muted sm:h-12" />
            <div className="mt-4 h-5 w-4/5 rounded bg-muted/80" />
          </div>

          <div className="mt-5 flex animate-pulse flex-wrap gap-2">
            <div className="h-8 w-20 rounded-full bg-muted" />
            <div className="h-8 w-24 rounded-full bg-muted" />
            <div className="h-8 w-16 rounded-full bg-muted" />
          </div>
        </header>

        <div className="mt-7 animate-pulse space-y-3 sm:mt-8">
          <div className="h-4 w-full rounded bg-muted/70" />
          <div className="h-4 w-4/5 rounded bg-muted/70" />
          <div className="h-4 w-2/3 rounded bg-muted/70" />
        </div>
      </article>
    </main>
  );
}
