export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex gap-6">
          <a
            href="https://github.com/yunkooo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="mailto:your@email.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>

        <div className="text-sm text-muted-foreground">
          © 2026 yunkoo (yunkoooooo@email)
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          All rights reserved
        </div>
      </div>
    </footer>
  );
}
