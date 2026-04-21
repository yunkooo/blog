"use client";

import Link from "next/link";
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

export function SiteHeader({
  currentSection,
}: {
  currentSection: "posts" | "about";
}) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const inactiveLinkClass = "text-muted-foreground transition-colors hover:text-foreground";
  const activeLinkClass = "text-foreground";

  return (
    <header className="flex items-center justify-between border-b border-border py-6">
      <Link href="/" className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="relative top-[2px] block size-[30px] bg-foreground transition-colors duration-200"
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
        <h1 className="text-xl">yunkoo.dev</h1>
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
          className="rounded-lg p-2 transition-colors hover:bg-muted"
          aria-label="Toggle dark mode"
          type="button"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
