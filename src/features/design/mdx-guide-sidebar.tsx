"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type MdxGuideNavItem = {
  href: string;
  title: string;
};

type MdxGuideSidebarProps = {
  basicDocs: MdxGuideNavItem[];
  componentDocs: MdxGuideNavItem[];
};

export function MdxGuideSidebar({ basicDocs, componentDocs }: MdxGuideSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-background to-transparent"
        />
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="px-2 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Design / MDX
          </p>
          <nav
            aria-label="Design guide sections"
            className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            <TocGroup title="소개">
              <TocLink href="/design" isActive={isActivePath(pathname, "/design")}>
                디자인 가이드
              </TocLink>
            </TocGroup>

            <TocGroup title="MDX 기본">
              {basicDocs.map((doc) => (
                <TocLink
                  key={doc.href}
                  href={doc.href}
                  isActive={isActivePath(pathname, doc.href)}
                >
                  {doc.title}
                </TocLink>
              ))}
            </TocGroup>

            <TocGroup title="MDX 컴포넌트">
              {componentDocs.map((doc) => (
                <TocLink
                  key={doc.href}
                  href={doc.href}
                  isActive={isActivePath(pathname, doc.href)}
                >
                  {doc.title}
                </TocLink>
              ))}
            </TocGroup>
          </nav>
        </div>
      </div>
    </aside>
  );
}

function TocGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="border-b border-border/70 px-2 pb-2 text-base font-semibold text-foreground">
        {title}
      </p>
      <div className="mt-2 grid gap-1">{children}</div>
    </div>
  );
}

function TocLink({
  href,
  isActive = false,
  children,
}: {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
        isActive
          ? "bg-muted/65 text-foreground"
          : "text-muted-foreground hover:bg-muted/45 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function isActivePath(pathname: string, href: string) {
  return normalizePath(pathname) === normalizePath(href);
}

function normalizePath(path: string) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}
