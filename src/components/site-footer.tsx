export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 sm:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[-0.01em]">yunkoo.dev</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://github.com/yunkooo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="mailto:kooruen@gmail.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
          </div>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground sm:text-right">
          <p>© 2026 yunkoo</p>
          <p>kooruen@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
