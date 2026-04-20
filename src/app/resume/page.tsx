"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

const basics = [
  { label: "이름", value: "이윤구" },
  { label: "이메일", value: "kooruen@gmail.com" },
  {
    label: "GitHub",
    value: "@yunkooo",
    href: "https://github.com/yunkooo",
  },
];

const education = [
  {
    school: "한국교통대학교",
    major: "컴퓨터공학과",
    period: "2020.03 - 2022.02",
    note: "졸업 · 학점 4.3 / 4.5",
  },
  {
    school: "수원과학대학교",
    major: "환경산업과",
    period: "2013.03 - 2020.02",
    note: "졸업 · 학점 3.8 / 4.5",
  },
];

const trainings = [
  {
    name: "멋쟁이사자처럼 프론트엔드스쿨 심화",
    period: "2024.06 - 2024.08",
    description:
      "Next.js 렌더링 방식을 학습하고, Next.js 기반 팀 프로젝트 협업 경험을 쌓았습니다.",
  },
  {
    name: "멋쟁이사자처럼 프론트엔드스쿨",
    period: "2022.08 - 2023.01",
    description:
      "프론트엔드 기술 전반과 React 기반 웹 개발을 학습했고, 회고와 지식 공유 중심의 협업을 경험했습니다.",
  },
];

const activities = [
  { name: "<DOM-잡았다,요 돔!> 도서 집필", period: "2022.09 - 2022.11" },
  { name: "제주코딩베이스 알고리즘 캠프", period: "2022.10" },
];

const certifications = ["정보처리기사 (2025.09.12)"];

const techDetails = [
  {
    category: "HTML / CSS",
    items: [
      "웹 표준과 웹 접근성을 고려한 시맨틱 마크업을 작성하고, 검색 엔진 최적화와 스크린리더 사용성을 함께 고려합니다.",
      "크로스 브라우징 이슈를 인지하고 미디어 쿼리를 활용해 다양한 환경에서 일관된 반응형 웹을 구현합니다.",
      "Tailwind CSS와 CSS-in-JS를 프로젝트 특성에 맞게 선택해 재사용 가능하고 유지보수하기 쉬운 스타일 구조를 만듭니다.",
    ],
  },
  {
    category: "JavaScript / TypeScript",
    items: [
      "실행 컨텍스트와 이벤트 루프의 동작을 이해하고, 비동기 흐름을 고려한 코드를 작성합니다.",
      "클로저와 React Hooks의 원리를 바탕으로 상태와 사이드이펙트를 안전하게 관리합니다.",
      "ES6+ 문법과 TypeScript를 적극적으로 활용해 런타임 에러를 줄이고 코드 가독성을 높입니다.",
    ],
  },
  {
    category: "React.js",
    items: [
      "Virtual DOM과 리렌더링 과정을 이해하고, 불필요한 렌더링을 줄이기 위한 최적화를 고민합니다.",
      "관심사 분리와 재사용성에 초점을 맞춰 커스텀 훅과 컴포넌트를 설계합니다.",
      "서버 상태와 클라이언트 상태를 분리해 관리하고, 사용자 경험을 고려한 인터랙션을 구현합니다.",
    ],
  },
  {
    category: "Next.js",
    items: [
      "서비스 요구사항에 맞게 SSG, SSR, CSR 전략을 유연하게 선택하며 핵심 웹 지표 개선을 고려합니다.",
      "데이터 캐싱과 재검증 전략을 활용해 성능과 최신성의 균형을 맞춘 화면을 구현합니다.",
    ],
  },
];

const projects = [
  {
    name: "ILB",
    period: "2024.08 - 2024.09",
    subtitle: "초보 육아러들을 위한 육아 용품 구독 서비스 (3인, 프론트엔드 개발)",
    role: "프론트엔드 팀원",
    stack: "Next.js, Tailwind CSS, TanStack Query, Zustand, shadcn/ui",
    highlights: [
      "TanStack Query를 활용해 서버 상태 관리와 비동기 API 호출을 처리했습니다.",
      "Zustand로 클라이언트 상태를 분리해 관리했습니다.",
      "Zod와 React Hook Form으로 입력값 검증을 구성했습니다.",
      "서버 액션을 활용해 로그인/회원가입 흐름의 보안을 강화했습니다.",
      "포트원을 통해 가상 토스 결제 시스템을 구현했습니다.",
      "NextAuth 5.0 기반 로그인/회원가입 기능을 구현했습니다.",
      "Funnel Pattern을 도입해 단계별 진행 상황을 시각화하고 복잡한 입력 과정을 단순화했습니다.",
    ],
  },
  {
    name: "Recipick",
    period: "2022.12 - 2023.01",
    subtitle: "레시피를 업로드하고 공유하는 목적의 SNS 플랫폼 (4인, 프론트엔드 개발)",
    role: "프론트엔드 팀원",
    stack: "React.js, styled-components, GitHub",
    highlights: [
      "GitHub Issue/PR 템플릿과 ESLint, Prettier 설정을 공유해 협업 효율을 높였습니다.",
      "useDebounce, useTheme 등 반복 로직을 커스텀 훅으로 분리해 재사용성을 높였습니다.",
      "로그인/회원가입 UI에서 오류 메시지를 제공해 불필요한 입력을 줄였습니다.",
      "무한 스크롤과 다크 모드를 적용했습니다.",
      "회원가입, 로그인, 리액션, 검색 기능을 구현했습니다.",
      "토큰 유무에 따라 라우터를 분리해 로그인 검증 기능을 구현했습니다.",
      "Intersection Observer API를 활용해 무한 스크롤을 구현했습니다.",
      "React-cookie를 활용해 사용자 인증 토큰을 클라이언트에 저장했습니다.",
      "AbortController를 이용해 언마운트 시 진행 중인 요청을 중단하도록 개선했습니다.",
      "디바운스 기법을 적용해 검색 API 요청을 최적화했습니다.",
    ],
  },
  {
    name: "인공지능 스쿼트 측정",
    period: "2021.08 - 2021.10",
    subtitle: "올바른 스쿼트를 할 수 있도록 도와주는 웹사이트 (3인, 프론트엔드 개발)",
    role: "프론트엔드 팀장",
    stack: "Vanilla JS, Firebase, Teachable Machine",
    highlights: [
      "Firebase 데이터베이스를 사용해 데이터를 관리했습니다.",
      "Teachable Machine을 활용해 AI 기반 측정 기능을 구현했습니다.",
      "사용자 관점에서 직접 사용해보며 화면 흐름과 디자인을 설계했습니다.",
      "2021 캡스톤 디자인 우수상을 수상했습니다.",
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentPath="/resume" />

        <main className="mb-8 mt-8 flex-1">
          <div className="rounded-[2rem] border border-border bg-card/80 shadow-sm backdrop-blur-sm">
            <section className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:px-10">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Resume</p>
                <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight sm:text-[2.35rem]">
                  안정적인 사용자 경험을 만드는 개발자, 이윤구입니다
                </h1>
                <div className="mt-5 max-w-4xl space-y-3 text-muted-foreground">
                  <p>
                    제품의 비정상적인 동작은 사용자에게 불쾌감을 주고 이탈을 만든다고 믿습니다.
                    저는 결함 없는 구현을 통해 안정적인 사용자 경험을 만드는 것에 가치를 둡니다.
                  </p>
                  <p>
                    급변하는 프론트엔드 생태계 속에서도 AI 기술을 학습 도구와 개발 보조 수단으로
                    활용하며, 빠르게 적응하고 꾸준히 개선하는 개발자가 되고자 합니다.
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[220px] lg:mx-0 lg:justify-self-end">
                <div className="overflow-hidden rounded-3xl border border-border bg-background p-2 shadow-sm">
                  <div className="overflow-hidden rounded-[1.25rem] bg-secondary">
                    <Image
                      src="/resume-profile.jpg"
                      alt="이윤구 프로필 캐리커처"
                      width={1600}
                      height={1080}
                      priority
                      className="aspect-[4/5] h-auto w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="divide-y divide-border">
              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
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

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">학력사항</h2>
                <div className="space-y-6">
                  {education.map((item) => (
                    <article key={item.school} className="space-y-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg">{item.school}</h3>
                        <span className="text-sm text-muted-foreground">{item.period}</span>
                      </div>
                      <p>{item.major}</p>
                      <p className="text-muted-foreground">{item.note}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">자격증</h2>
                <div className="space-y-2">
                  {certifications.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">교육</h2>
                <div className="space-y-6">
                  {trainings.map((item) => (
                    <article key={item.name} className="space-y-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg">{item.name}</h3>
                        <span className="text-sm text-muted-foreground">{item.period}</span>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">활동</h2>
                <div className="space-y-4">
                  {activities.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p>{item.name}</p>
                      <span className="text-sm text-muted-foreground">{item.period}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">기술</h2>
                <div className="space-y-8">
                  {techDetails.map((section) => (
                    <article key={section.category} className="space-y-3">
                      <h3 className="text-lg">{section.category}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[160px_minmax(0,1fr)] lg:px-10">
                <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">주요 프로젝트</h2>
                <div className="space-y-10">
                  {projects.map((project) => (
                    <article key={project.name} className="space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-xl">{project.name}</h3>
                          <p className="mt-1 text-muted-foreground">{project.subtitle}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{project.period}</span>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>역할: {project.role}</p>
                        <p>기술 스택: {project.stack}</p>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        {project.highlights.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
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
