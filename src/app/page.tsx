"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useMemo, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  year: number;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "신입 개발자로 첫 출근 전에 준비한 것들",
    description: "처음 팀에 합류하기 전에 개발 환경, 협업 도구, 기본 용어를 어떻게 정리했는지 적어봤습니다.",
    date: "2025년 9월 17일",
    year: 2025,
  },
  {
    id: 2,
    title: "코드리뷰가 무서웠던 신입 시절 이야기",
    description:
      "처음 코드리뷰를 받을 때 어떤 부분이 가장 어려웠고, 어떻게 익숙해졌는지 경험 위주로 정리했습니다.",
    date: "2025년 7월 16일",
    year: 2025,
  },
  {
    id: 3,
    title: "첫 버그 수정 배포에서 배운 점",
    description: "작은 버그 하나를 수정하고 배포하는 과정에서 신입 개발자가 꼭 알면 좋을 점들을 기록했습니다.",
    date: "2025년 6월 4일",
    year: 2025,
  },
  {
    id: 4,
    title: "회의록을 잘 쓰는 것도 개발 실력일까",
    description:
      "개발만 잘하면 된다고 생각했는데, 회의 내용을 정리하고 공유하는 일도 꽤 중요한 역량이라는 걸 느꼈습니다.",
    date: "2024년 7월 17일",
    year: 2024,
  },
  {
    id: 5,
    title: "사수에게 질문하는 타이밍을 배운 순간",
    description:
      "혼자 너무 오래 붙잡고 있지 않기 위해, 언제 질문하고 어떻게 맥락을 정리해야 하는지 정리해봤습니다.",
    date: "2024년 4월 2일",
    year: 2024,
  },
  {
    id: 6,
    title: "신입 개발자의 첫 회고 작성법",
    description: "주간 회고를 쓰면서 무엇을 남겨야 성장에 도움이 되는지, 실제 예시와 함께 정리했습니다.",
    date: "2023년 12월 3일",
    year: 2023,
  },
  {
    id: 7,
    title: "처음 맡은 유지보수 업무가 더 어려웠던 이유",
    description: "새 기능 개발보다 기존 코드를 이해하는 일이 더 어려웠던 경험과 적응 방법을 적었습니다.",
    date: "2025년 8월 25일",
    year: 2025,
  },
  {
    id: 8,
    title: "작은 PR로 나눠서 올리는 습관 만들기",
    description: "한 번에 큰 작업을 올리기보다 작은 단위로 나눠 리뷰받는 습관이 왜 중요한지 기록했습니다.",
    date: "2025년 8월 12일",
    year: 2025,
  },
  {
    id: 9,
    title: "처음으로 API 문서를 읽고 연동해본 날",
    description: "백엔드 문서를 보며 프론트엔드 화면을 연결했던 경험을 바탕으로, 처음 문서를 읽는 법을 정리했습니다.",
    date: "2025년 7월 30일",
    year: 2025,
  },
  {
    id: 10,
    title: "에러 메시지를 읽는 습관이 생기기까지",
    description: "무작정 검색만 하던 시기에서 벗어나, 에러 메시지 자체를 읽고 추적하게 된 과정을 적었습니다.",
    date: "2025년 7월 5일",
    year: 2025,
  },
  {
    id: 11,
    title: "개발일지를 쓰면 좋은 이유",
    description: "매일 짧게라도 기록을 남기면서, 막혔던 문제를 다시 돌아보는 힘이 생겼던 경험을 소개합니다.",
    date: "2025년 6월 20일",
    year: 2025,
  },
  {
    id: 12,
    title: "처음으로 운영 이슈를 대응해본 경험",
    description: "운영 중인 서비스에서 문제가 생겼을 때, 신입 개발자로서 어떻게 상황을 따라가고 정리했는지 공유합니다.",
    date: "2025년 6월 1일",
    year: 2025,
  },
  {
    id: 13,
    title: "익숙하지 않은 코드베이스를 읽는 방법",
    description: "처음 보는 프로젝트 구조를 빠르게 이해하기 위해 제가 실제로 사용한 순서를 정리했습니다.",
    date: "2025년 5월 18일",
    year: 2025,
  },
  {
    id: 14,
    title: "신입 개발자가 문서화를 놓치기 쉬운 이유",
    description: "코드만 잘 짜면 된다고 생각했지만, 기록과 공유가 팀 생산성에 미치는 영향을 돌아봤습니다.",
    date: "2025년 4월 27일",
    year: 2025,
  },
  {
    id: 15,
    title: "UI 수정 하나에도 확인할 것이 많았다",
    description: "작은 스타일 수정이라고 가볍게 봤다가 반응형, 접근성, 회귀 테스트까지 챙기게 된 경험을 적었습니다.",
    date: "2025년 3월 14일",
    year: 2025,
  },
  {
    id: 16,
    title: "처음 받은 장애 회고 문서 읽기",
    description: "장애 회고 문서를 읽으면서 기술적인 원인보다 커뮤니케이션의 중요성을 더 크게 느꼈습니다.",
    date: "2024년 11월 9일",
    year: 2024,
  },
  {
    id: 17,
    title: "처음 맡은 일정 산정이 어려웠던 이유",
    description: "얼마나 걸릴지 가늠하지 못했던 신입 시절, 작업을 잘게 나누며 일정 감각을 익힌 과정을 적었습니다.",
    date: "2024년 9월 21일",
    year: 2024,
  },
  {
    id: 18,
    title: "테스트 코드가 왜 필요한지 늦게 이해했다",
    description: "처음에는 귀찮게만 느껴졌던 테스트 코드가, 나중에는 가장 든든한 안전장치였다는 걸 정리했습니다.",
    date: "2024년 6월 28일",
    year: 2024,
  },
  {
    id: 19,
    title: "신입 개발자의 슬럼프 대처법",
    description: "비교와 조급함 때문에 힘들었던 시기를 지나며, 다시 루틴을 회복하는 데 도움이 된 방법을 적어봤습니다.",
    date: "2023년 10월 14일",
    year: 2023,
  },
  {
    id: 20,
    title: "작은 성공 경험이 자신감을 만든다",
    description: "큰 기능보다 작은 문제를 하나씩 해결해나가며 실력을 쌓았던 신입 시절의 경험을 돌아봤습니다.",
    date: "2023년 8월 2일",
    year: 2023,
  },
];

const POSTS_PER_PAGE = 6;

function BlogPostItem({ title, description, date }: Omit<BlogPost, "id" | "year">) {
  return (
    <article className="group cursor-pointer rounded-lg px-4 py-6 transition-colors hover:bg-muted/30 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="flex-1 space-y-3">
          <h2 className="transition-colors group-hover:text-muted-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <time className="text-sm text-muted-foreground md:mt-1 md:whitespace-nowrap">
          {date}
        </time>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-16 flex justify-center gap-2" aria-label="Pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`size-10 rounded-lg transition-colors ${
            currentPage === page
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return blogPosts.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentPath="/" />

        <main className="mb-8 mt-8 flex-1">
          <div className="space-y-4" id="scraps">
            {currentPosts.map((post) => (
              <BlogPostItem key={post.id} {...post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
