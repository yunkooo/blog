import type { Metadata } from "next";
import Link from "next/link";
import {
  basicDocs,
  componentDocs,
  getMdxGuideHref,
  MdxGuideLayout,
} from "@/features/design/mdx-guide-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
  alternates: {
    canonical: "/design",
    types: {
      "application/rss+xml": siteConfig.rssUrl,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
    url: `${siteConfig.url}/design`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
    images: [siteConfig.ogImage],
  },
};

export default function DesignPage() {
  const firstBasicDoc = basicDocs[0];
  const firstComponentDoc = componentDocs.find((doc) => doc.slug === "callout") ?? componentDocs[0];

  return (
    <MdxGuideLayout>
      <section className="border-b border-border pb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">MDX Guide</p>
        <h1 className="mt-3 text-[1.9rem] font-semibold tracking-tight sm:text-[2.55rem]">
          글 쓸 때 바로 보는 디자인 가이드
        </h1>
        <div className="mt-4 max-w-3xl space-y-2 text-[1rem] leading-8 text-muted-foreground sm:text-[1.06rem]">
          <p>블로그 글을 쓸 때 자주 쓰는 MDX 문법을 모아두었습니다.</p>
          <p>커스텀 컴포넌트가 실제로 어떻게 보이는지도 함께 확인할 수 있습니다.</p>
          <p>필요한 예시를 골라 MDX 파일에 붙여 넣고, 문장만 글에 맞게 바꿔 쓰면 됩니다.</p>
        </div>
      </section>

      <section className="grid gap-4 py-8 sm:grid-cols-2 sm:py-10">
        <GuideLinkCard
          href={getMdxGuideHref(firstBasicDoc)}
          title="MDX 기본"
          description="제목, 목록, 코드블록처럼 글을 구성하는 기본 문법을 확인합니다."
        />
        <GuideLinkCard
          href={getMdxGuideHref(firstComponentDoc)}
          title="MDX 컴포넌트"
          description="Callout, SummaryBox, FileTree처럼 글 안에서 쓰는 컴포넌트 예시를 확인합니다."
        />
      </section>
    </MdxGuideLayout>
  );
}

function GuideLinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border/80 bg-background px-5 py-5 transition-colors hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <p className="text-lg font-semibold tracking-tight">{title}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
    </Link>
  );
}
