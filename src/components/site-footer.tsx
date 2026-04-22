export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 py-6 sm:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[-0.01em]">yunkoo.dev</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://github.com/yunkooo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              GitHub
            </a>
            <a
              href="mailto:kooruen@gmail.com"
              className="rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              Email
            </a>
            <a
              href="/rss.xml"
              className="rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              RSS
            </a>
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground sm:text-right">
          <p>© 2026 yunkoo</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
