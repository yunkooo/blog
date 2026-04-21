import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

const basics = [
  { label: "이름", value: "이윤구" },
  { label: "이메일", value: "kooruen@gmail.com" },
  {
    label: "GitHub",
    value: "@yunkooo",
    href: "https://github.com/yunkooo",
  },
];

const certifications = ["정보처리기사 (2025.09.12)"];

export const metadata: Metadata = {
  title: "About",
  description: "프론트엔드 개발자 이윤구에 대한 간단한 소개 페이지입니다.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "프론트엔드 개발자 이윤구에 대한 간단한 소개 페이지입니다.",
    url: `${siteConfig.url}/about`,
    type: "profile",
    images: [
      {
        url: "/resume-profile.jpg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description: "프론트엔드 개발자 이윤구에 대한 간단한 소개 페이지입니다.",
    images: ["/resume-profile.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentSection="about" />

        <main className="flex-1 py-8 sm:py-10">
          <div>
            <section className="grid gap-8 px-0 py-1 sm:py-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">About</p>
                <h1 className="mt-3 text-[1.65rem] font-semibold tracking-tight sm:text-[2.15rem]">
                  우당탕탕 삽질중인 개발자 이윤구입니다
                </h1>
                <div className="mt-20 max-w-3xl space-y-2.5 text-muted-foreground">
                  <p>
                    사용자가 불편 없이 머무를 수 있는 화면을 만드는 일을 좋아합니다.
                  </p>
                  <p>
                    구조를 단정하게 정리하고, 작은 문제도 꾸준히 개선하면서 안정적인 사용자 경험을
                    쌓아가고 있습니다.
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[220px] sm:max-w-[232px] lg:mx-0 lg:mt-1 lg:justify-self-end">
                <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-background p-2">
                  <div className="overflow-hidden rounded-[1.35rem] bg-secondary">
                    <Image
                      src="/resume-profile.jpg"
                      alt="이윤구 프로필 캐리커처"
                      width={1600}
                      height={1080}
                      priority
                      className="aspect-[5/6] h-auto w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-6 divide-y divide-border">
              <section className="grid gap-4 px-0 py-5 sm:py-6 lg:grid-cols-[132px_minmax(0,1fr)]">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">기본사항</h2>
                <div className="grid gap-3">
                  {basics.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6"
                    >
                      <p className="min-w-20 text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-muted-foreground"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p>{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 px-0 py-5 sm:py-6 lg:grid-cols-[132px_minmax(0,1fr)]">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">자격증</h2>
                <div className="space-y-2">
                  {certifications.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
