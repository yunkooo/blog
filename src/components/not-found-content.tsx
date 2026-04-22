import Link from "next/link";

export function NotFoundContent() {
  return (
    <main className="flex flex-1 items-center py-16 sm:py-24">
      <section className="w-full border-y border-border/80 py-10 sm:py-12">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-[1.9rem] font-semibold tracking-tight sm:text-[2.5rem]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
          주소가 바뀌었거나 아직 공개되지 않은 글일 수 있습니다. 글 목록으로 돌아가서 다른
          기록을 살펴보세요.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-border/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          글 목록으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
