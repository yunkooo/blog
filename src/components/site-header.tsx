"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M20 14.2A8 8 0 1 1 9.8 4 6.7 6.7 0 0 0 20 14.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function SiteHeader() {
  const { isDarkMode, isMounted, toggleDarkMode } = useTheme();
  const pathname = usePathname();
  const linkBaseClass =
    "rounded-md px-1 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
  const inactiveLinkClass = `${linkBaseClass} text-muted-foreground hover:text-foreground`;
  const activeLinkClass = `${linkBaseClass} text-foreground`;
  const currentSection = pathname === "/about" ? "about" : "posts";

  return (
    <header className="flex items-center justify-between border-b border-border/80 py-5 sm:py-6">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <span
          aria-hidden="true"
          className="relative top-[2px] block size-7 bg-foreground transition-colors duration-200"
          style={{
            WebkitMaskImage: "url('/blog-logo.svg')",
            maskImage: "url('/blog-logo.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
        <h1 className="text-lg font-medium tracking-[-0.02em] sm:text-xl">yunkoo.dev</h1>
      </Link>

      <div className="flex items-center gap-4">
        <nav className="flex gap-5 sm:gap-8">
          <Link href="/" className={currentSection === "posts" ? activeLinkClass : inactiveLinkClass}>
            posts
          </Link>
          <Link
            href="/about"
            className={currentSection === "about" ? activeLinkClass : inactiveLinkClass}
          >
            about
          </Link>
        </nav>

        <button
          onClick={toggleDarkMode}
          className="rounded-lg p-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Toggle dark mode"
          type="button"
        >
          {isMounted ? isDarkMode ? <SunIcon /> : <MoonIcon /> : <span className="block size-5" />}
        </button>
      </div>
    </header>
  );
}
