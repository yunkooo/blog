import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatKoreanDate,
  getPostBySlug,
  getPostSlugs,
  renderPostContent,
} from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} | yunkoo.dev`,
    description: post.description,
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const content = await renderPostContent(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentSection="posts" />

        <main className="flex-1 py-10 sm:py-12">
          <article className="px-0 py-1 sm:py-2">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              목록으로 돌아가기
            </Link>

            <header className="mt-4 border-b border-border pb-6">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{post.category}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={post.publishedAt}>{formatKoreanDate(post.publishedAt)}</time>
                <span aria-hidden="true">/</span>
                <span>{post.readingTimeText}</span>
              </div>

              <h1 className="mt-3 text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]">
                {post.title}
              </h1>
              <p className="mt-3 w-full text-base text-muted-foreground sm:text-lg">{post.description}</p>

              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="post-content mt-8 w-full">{content}</div>
          </article>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
