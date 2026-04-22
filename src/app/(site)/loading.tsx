export default function Loading() {
  return (
    <main className="flex-1 py-8 sm:py-10">
      <section className="px-0 py-1 sm:py-3" aria-label="글 목록을 불러오는 중">
        <div className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className="py-4 first:pt-0 last:pb-0 sm:py-5">
              <div className="rounded-2xl border border-transparent px-2 py-3 sm:px-4">
                <div className="flex animate-pulse flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-7 w-24 rounded-full bg-muted" />
                      <div className="h-7 w-16 rounded-full bg-muted/80" />
                      <div className="h-7 w-20 rounded-full bg-muted/80" />
                    </div>

                    <div className="space-y-2.5">
                      <div className="h-6 w-4/5 rounded-lg bg-muted sm:h-7" />
                      <div className="h-4 w-full rounded bg-muted/80" />
                    </div>
                  </div>

                  <div className="h-4 w-28 shrink-0 rounded bg-muted/80 md:mt-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
