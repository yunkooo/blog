import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "yunkoo.dev",
  description: "반응형 블로그 디자인을 기반으로 만든 블로그 홈",
  icons: {
    icon: [
      { url: "/blog-logo.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/blog-logo.svg", type: "image/svg+xml", sizes: "48x48" },
    ],
    shortcut: [{ url: "/blog-logo.svg", type: "image/svg+xml", sizes: "32x32" }],
    apple: [{ url: "/blog-logo.svg", type: "image/svg+xml", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
