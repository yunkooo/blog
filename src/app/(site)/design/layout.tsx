import type { ReactNode } from "react";
import {
  basicDocs,
  componentDocs,
  getMdxGuideHref,
} from "@/features/design/mdx-guide-data";
import { MdxGuideSidebar } from "@/features/design/mdx-guide-sidebar";

export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <MdxGuideSidebar
          basicDocs={basicDocs.map((doc) => ({
            href: getMdxGuideHref(doc),
            title: doc.title,
          }))}
          componentDocs={componentDocs.map((doc) => ({
            href: getMdxGuideHref(doc),
            title: doc.title,
          }))}
        />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
