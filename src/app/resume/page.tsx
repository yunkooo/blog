"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Git/GitHub",
  "REST API",
  "Figma 협업",
];

const projects = [
  {
    name: "개인 블로그 리디자인",
    period: "2026",
    description:
      "Next.js App Router 기반으로 블로그 메인 화면과 라우팅 구조를 재구성하고, 다크모드와 브랜딩 자산을 함께 정리했습니다.",
  },
  {
    name: "사내 대시보드 유지보수",
    period: "2025",
    description:
      "기존 화면의 UI 수정과 API 연동, 버그 수정 업무를 맡으며 운영 중인 서비스의 변경 흐름을 익혔습니다.",
  },
  {
    name: "스터디 기록 서비스",
    period: "2024",
    description:
      "React와 TypeScript를 사용해 일정, 회고, 체크리스트를 기록하는 작은 웹 서비스를 팀 프로젝트로 구현했습니다.",
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentPath="/resume" />

        <main className="mb-8 mt-8 flex-1">
          <section className="border-b border-border pb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Resume</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">윤군 프론트엔드 개발자 이력서</h1>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              사용자 경험을 세심하게 다듬는 프론트엔드 개발자를 목표로 공부하고 있습니다.
              작은 기능도 끝까지 책임지고 개선하는 태도를 중요하게 생각합니다.
            </p>
          </section>

          <section className="grid gap-10 py-8 md:grid-cols-[180px_minmax(0,1fr)]">
            <h2 className="text-muted-foreground">기본 정보</h2>
            <div className="space-y-3">
              <p>이름: 윤군</p>
              <p>이메일: your@email.com</p>
              <p>GitHub: github.com/yunkooo</p>
              <p>관심 분야: 프론트엔드, 웹 접근성, UI 구현, 협업 프로세스</p>
            </div>
          </section>

          <section className="grid gap-10 border-t border-border py-8 md:grid-cols-[180px_minmax(0,1fr)]">
            <h2 className="text-muted-foreground">기술 스택</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-border py-8 md:grid-cols-[180px_minmax(0,1fr)]">
            <h2 className="text-muted-foreground">프로젝트</h2>
            <div className="space-y-8">
              {projects.map((project) => (
                <article key={project.name} className="space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg">{project.name}</h3>
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-border py-8 md:grid-cols-[180px_minmax(0,1fr)]">
            <h2 className="text-muted-foreground">한 줄 소개</h2>
            <p className="max-w-3xl text-muted-foreground">
              빠르게 구현하는 것만큼, 읽기 쉽고 함께 고치기 쉬운 코드를 만드는 데 관심이 많습니다.
              배운 내용을 기록하고 공유하면서 꾸준히 성장하는 개발자가 되고 싶습니다.
            </p>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
