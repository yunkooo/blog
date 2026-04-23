import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ExampleCard,
  getMdxGuideDocBySlug,
  getMdxGuideStaticParams,
} from "@/features/design/mdx-guide-data";
import { siteConfig } from "@/lib/site";

type MdxGuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getMdxGuideStaticParams();
}

export async function generateMetadata({ params }: MdxGuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getMdxGuideDocBySlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: siteConfig.title,
    description: doc.description,
    alternates: {
      canonical: `/design/mdx/${encodeURIComponent(doc.slug)}`,
      types: {
        "application/rss+xml": siteConfig.rssUrl,
      },
    },
    openGraph: {
      title: siteConfig.title,
      description: doc.description,
      url: `${siteConfig.url}/design/mdx/${encodeURIComponent(doc.slug)}`,
      type: "article",
      images: [
        {
          url: siteConfig.ogImage,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: siteConfig.title,
      description: doc.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function MdxGuideDetailPage({ params }: MdxGuideDetailPageProps) {
  const { slug } = await params;
  const doc = getMdxGuideDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-border pb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {doc.category === "basic" ? "MDX Basic" : "MDX Component"}
        </p>
        <h1 className="mt-3 text-[1.9rem] font-semibold tracking-tight sm:text-[2.55rem]">
          {doc.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-muted-foreground sm:text-[1.06rem]">
          {doc.description}
        </p>
      </section>

      <section className="py-8 sm:py-10">
        <ExampleCard doc={doc} />
      </section>
    </>
  );
}
