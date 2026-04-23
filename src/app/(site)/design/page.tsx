import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AsideNote,
  Callout,
  Checklist,
  CodePanel,
  CompareBox,
  DefinitionBox,
  FileTree,
  InsightCard,
  KeyPoint,
  LeadText,
  MermaidDiagram,
  MiniCardGrid,
  QuoteBlock,
  SectionBreak,
  Spotlight,
  StepList,
  SummaryBox,
  TerminalBlock,
} from "@/components/mdx";
import { siteConfig } from "@/lib/site";

type BasicExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  preview: ReactNode;
};

type ComponentDoc = {
  name: string;
  description: string;
  code: string;
  preview: ReactNode;
  note?: string;
};

const markdownExamples: BasicExample[] = [
  {
    id: "headings",
    title: "제목과 문단",
    description: "글의 큰 흐름은 제목으로 나누고, 설명은 짧은 문단으로 이어갑니다.",
    code: ["## MDX를 고른 이유", "", "React 컴포넌트를 글 안에서 바로 사용할 수 있습니다."].join("\n"),
    preview: (
      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-[-0.01em]">MDX를 고른 이유</h3>
        <p className="leading-7 text-muted-foreground">
          React 컴포넌트를 글 안에서 바로 사용할 수 있습니다.
        </p>
      </div>
    ),
  },
  {
    id: "lists",
    title: "목록과 체크리스트",
    description: "할 일, 비교 기준, 읽는 순서처럼 훑어봐야 하는 내용에 사용합니다.",
    code: ["- Next.js로 라우팅하기", "- MDX로 글 작성하기", "- [x] 코드블록 확인하기"].join(
      "\n",
    ),
    preview: (
      <div className="space-y-2 text-muted-foreground">
        <p>- Next.js로 라우팅하기</p>
        <p>- MDX로 글 작성하기</p>
        <p>- [x] 코드블록 확인하기</p>
      </div>
    ),
  },
  {
    id: "code",
    title: "코드블록",
    description: "언어 이름을 붙이면 블로그 렌더러가 코드 예시를 읽기 좋게 보여줍니다.",
    code: ["```tsx", "export function Example() {", "  return <p>Hello MDX</p>;", "}", "```"].join(
      "\n",
    ),
    preview: (
      <CodeSnippet
        code={["export function Example() {", "  return <p>Hello MDX</p>;", "}"].join("\n")}
      />
    ),
  },
  {
    id: "table",
    title: "표",
    description: "GFM 문법으로 간단한 비교표를 만들 수 있습니다.",
    code: ["| 도구 | 역할 |", "| --- | --- |", "| remark-gfm | 표와 체크리스트 |"].join("\n"),
    preview: (
      <div className="overflow-hidden rounded-2xl border border-border/80">
        <div className="grid grid-cols-2 border-b border-border/80 bg-muted/35 text-sm font-medium">
          <p className="px-4 py-2">도구</p>
          <p className="px-4 py-2">역할</p>
        </div>
        <div className="grid grid-cols-2 text-sm text-muted-foreground">
          <p className="px-4 py-2">remark-gfm</p>
          <p className="px-4 py-2">표와 체크리스트</p>
        </div>
      </div>
    ),
  },
  {
    id: "mermaid",
    title: "Mermaid 다이어그램",
    description: "글 안의 mermaid 코드블록은 자동으로 다이어그램 컴포넌트로 바뀝니다.",
    code: ["```mermaid", "flowchart LR", "  Draft --> Render", "  Render --> Publish", "```"].join(
      "\n",
    ),
    preview: (
      <MermaidDiagram
        chart={["flowchart LR", "  Draft --> Render", "  Render --> Publish"].join("\n")}
      />
    ),
  },
];

const componentDocs: ComponentDoc[] = [
  {
    name: "LeadText",
    description: "도입부에서 글의 첫 인상을 조금 더 크게 보여줄 때 사용합니다.",
    code: ["<LeadText>", "  블로그 글의 시작 문장을 더 또렷하게 보여줍니다.", "</LeadText>"].join("\n"),
    preview: <LeadText>블로그 글의 시작 문장을 더 또렷하게 보여줍니다.</LeadText>,
  },
  {
    name: "Spotlight",
    description: "가장 중요한 한 문장이나 관점을 크게 강조합니다.",
    code: [
      '<Spotlight title="핵심">',
      "  완벽한 설계보다 계속 고쳐나갈 수 있는 구조가 먼저입니다.",
      "</Spotlight>",
    ].join("\n"),
    preview: (
      <Spotlight title="핵심">
        완벽한 설계보다 계속 고쳐나갈 수 있는 구조가 먼저입니다.
      </Spotlight>
    ),
    note: "title을 생략하면 기본값은 '핵심'입니다.",
  },
  {
    name: "KeyPoint",
    description: "글 중간의 핵심 포인트를 짧게 짚고 넘어갈 때 사용합니다.",
    code: [
      '<KeyPoint title="기억할 점">',
      "  MDX 컴포넌트는 글의 흐름을 끊지 않는 선에서만 사용합니다.",
      "</KeyPoint>",
    ].join("\n"),
    preview: (
      <KeyPoint title="기억할 점">
        MDX 컴포넌트는 글의 흐름을 끊지 않는 선에서만 사용합니다.
      </KeyPoint>
    ),
  },
  {
    name: "Callout",
    description: "정보, 주의, 성공 같은 상태를 가진 안내 문장을 담습니다.",
    code: [
      '<Callout tone="warning">',
      "  배포 전에 로컬에서 링크와 이미지 경로를 다시 확인합니다.",
      "</Callout>",
    ].join("\n"),
    preview: (
      <Callout tone="warning">
        배포 전에 로컬에서 링크와 이미지 경로를 다시 확인합니다.
      </Callout>
    ),
    note: "tone은 info, note, warning, success를 사용할 수 있습니다.",
  },
  {
    name: "AsideNote",
    description: "본문 흐름에서 살짝 벗어난 참고 설명을 작게 덧붙입니다.",
    code: [
      '<AsideNote title="잠깐">',
      "  이 블로그의 글은 content-source/posts에서 관리합니다.",
      "</AsideNote>",
    ].join("\n"),
    preview: (
      <AsideNote title="잠깐">
        이 블로그의 글은 content-source/posts에서 관리합니다.
      </AsideNote>
    ),
  },
  {
    name: "DefinitionBox",
    description: "용어를 처음 소개할 때 정의와 설명을 함께 보여줍니다.",
    code: [
      "<DefinitionBox",
      '  term="MDX"',
      '  description="Markdown 안에서 React 컴포넌트를 함께 사용할 수 있는 글 형식입니다."',
      "/>",
    ].join("\n"),
    preview: (
      <DefinitionBox
        term="MDX"
        description="Markdown 안에서 React 컴포넌트를 함께 사용할 수 있는 글 형식입니다."
      />
    ),
  },
  {
    name: "SummaryBox",
    description: "섹션 마지막에 기억할 내용을 bullet로 정리합니다.",
    code: [
      "<SummaryBox",
      '  title="요약"',
      '  items="MDX는 글과 컴포넌트를 함께 쓴다|코드블록은 언어를 붙인다|컴포넌트는 필요한 곳에만 쓴다"',
      "/>",
    ].join("\n"),
    preview: (
      <SummaryBox
        title="요약"
        items="MDX는 글과 컴포넌트를 함께 쓴다|코드블록은 언어를 붙인다|컴포넌트는 필요한 곳에만 쓴다"
      />
    ),
    note: "items는 배열 또는 | 로 구분한 문자열을 받을 수 있습니다.",
  },
  {
    name: "Checklist",
    description: "발행 전 점검 항목처럼 체크해야 할 일을 정리합니다.",
    code: [
      "<Checklist",
      '  title="발행 전 체크"',
      '  items="frontmatter 확인|이미지 경로 확인|모바일 화면 확인"',
      "/>",
    ].join("\n"),
    preview: (
      <Checklist title="발행 전 체크" items="frontmatter 확인|이미지 경로 확인|모바일 화면 확인" />
    ),
  },
  {
    name: "StepList",
    description: "순서가 중요한 작업을 단계별로 보여줍니다.",
    code: ["<StepList items=\"초안 작성|로컬에서 미리보기|수정 후 발행\" />"].join("\n"),
    preview: <StepList items="초안 작성|로컬에서 미리보기|수정 후 발행" />,
  },
  {
    name: "CompareBox",
    description: "두 선택지의 차이를 나란히 비교합니다.",
    code: [
      "<CompareBox",
      '  leftTitle="Markdown"',
      '  rightTitle="MDX"',
      '  leftItems="문서 작성에 집중|문법이 단순함"',
      '  rightItems="컴포넌트 사용 가능|표현을 확장하기 좋음"',
      "/>",
    ].join("\n"),
    preview: (
      <CompareBox
        leftTitle="Markdown"
        rightTitle="MDX"
        leftItems="문서 작성에 집중|문법이 단순함"
        rightItems="컴포넌트 사용 가능|표현을 확장하기 좋음"
      />
    ),
  },
  {
    name: "MiniCardGrid",
    description: "짧은 개념 여러 개를 카드 형태로 훑게 합니다.",
    code: [
      "<MiniCardGrid",
      '  items="remark: Markdown을 다룬다|rehype: HTML 단계에서 다듬는다|MDXRemote: 글을 렌더링한다"',
      "/>",
    ].join("\n"),
    preview: (
      <MiniCardGrid items="remark: Markdown을 다룬다|rehype: HTML 단계에서 다듬는다|MDXRemote: 글을 렌더링한다" />
    ),
  },
  {
    name: "InsightCard",
    description: "삽질 끝에 배운 점이나 회고성 문장을 담습니다.",
    code: [
      '<InsightCard title="배운 점">',
      "  처음부터 완벽히 만들기보다 불편한 부분을 발견하며 고쳐가는 편이 오래갑니다.",
      "</InsightCard>",
    ].join("\n"),
    preview: (
      <InsightCard title="배운 점">
        처음부터 완벽히 만들기보다 불편한 부분을 발견하며 고쳐가는 편이 오래갑니다.
      </InsightCard>
    ),
  },
  {
    name: "QuoteBlock",
    description: "인용문이나 스스로 남기는 짧은 문장을 분리해 보여줍니다.",
    code: [
      '<QuoteBlock source="작업 메모">',
      "  작게 시작해도 기록이 쌓이면 구조가 보입니다.",
      "</QuoteBlock>",
    ].join("\n"),
    preview: (
      <QuoteBlock source="작업 메모">
        작게 시작해도 기록이 쌓이면 구조가 보입니다.
      </QuoteBlock>
    ),
  },
  {
    name: "SectionBreak",
    description: "글의 장면이 바뀔 때 시각적인 쉼표를 넣습니다.",
    code: ['<SectionBreak label="next" />'].join("\n"),
    preview: <SectionBreak label="next" />,
  },
  {
    name: "CodePanel",
    description: "파일명이나 설명이 필요한 코드 예시를 묶어서 보여줍니다.",
    code: [
      "<CodePanel",
      '  title="app/page.tsx"',
      '  language="tsx"',
      "  code={'export default function Page() {\\n  return <main />;\\n}'}",
      "/>",
    ].join("\n"),
    preview: (
      <CodePanel
        title="app/page.tsx"
        language="tsx"
        code={["export default function Page() {", "  return <main />;", "}"].join("\n")}
      />
    ),
  },
  {
    name: "TerminalBlock",
    description: "터미널에서 실행한 명령을 실제 콘솔처럼 보여줍니다.",
    code: [
      "<TerminalBlock",
      '  title="local"',
      '  code="npm run dev|npm run lint"',
      "/>",
    ].join("\n"),
    preview: <TerminalBlock title="local" code="npm run dev|npm run lint" />,
  },
  {
    name: "FileTree",
    description: "폴더 구조를 설명할 때 사용합니다.",
    code: [
      "<FileTree",
      '  title="posts"',
      '  code="content-source/|  posts/|    building-my-blog-with-nextjs-mdx.mdx"',
      "/>",
    ].join("\n"),
    preview: (
      <FileTree
        title="posts"
        code="content-source/|  posts/|    building-my-blog-with-nextjs-mdx.mdx"
      />
    ),
  },
  {
    name: "MermaidDiagram",
    description: "흐름도나 관계도를 다이어그램으로 보여줍니다.",
    code: ["```mermaid", "flowchart TD", "  Draft --> Preview", "  Preview --> Publish", "```"].join("\n"),
    preview: (
      <MermaidDiagram
        chart={["flowchart TD", "  Draft --> Preview", "  Preview --> Publish"].join("\n")}
      />
    ),
    note: "일반 글에서는 직접 컴포넌트를 쓰기보다 mermaid 코드블록을 사용하면 자동 변환됩니다.",
  },
];

export const metadata: Metadata = {
  description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
  alternates: {
    canonical: "/design",
    types: {
      "application/rss+xml": siteConfig.rssUrl,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
    url: `${siteConfig.url}/design`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: "yunkoo.dev 블로그 글 작성에 사용하는 MDX 문법과 커스텀 컴포넌트 사용법입니다.",
    images: [siteConfig.ogImage],
  },
};

export default function DesignPage() {
  return (
    <main className="flex-1 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-border/80 bg-background p-3">
            <p className="px-2 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Design
            </p>
            <nav
              aria-label="Design guide sections"
              className="mt-2 grid gap-1 sm:grid-cols-3 lg:grid-cols-1"
            >
              <TocLink href="#intro">소개</TocLink>
              <TocLink href="#mdx-basic">MDX 기본</TocLink>
              {componentDocs.map((component) => (
                <TocLink key={component.name} href={`#${component.name.toLowerCase()}`}>
                  {component.name}
                </TocLink>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          <section id="intro" className="border-b border-border pb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">MDX Guide</p>
            <h1 className="mt-3 text-[1.9rem] font-semibold tracking-tight sm:text-[2.55rem]">
              글 쓸 때 바로 보는 디자인 가이드
            </h1>
            <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-muted-foreground sm:text-[1.06rem]">
              이 페이지는 yunkoo.dev에서 블로그 글을 작성할 때 사용하는 MDX 문법과 커스텀
              컴포넌트를 한곳에 모아둔 참고 문서입니다. 필요한 예시를 찾아서 MDX 파일에 붙여
              넣고, 문맥에 맞게 문장만 바꿔 쓰면 됩니다.
            </p>
          </section>

          <section id="mdx-basic" className="scroll-mt-8 border-b border-border py-8 sm:py-10">
            <SectionHeader
              eyebrow="Basics"
              title="MDX 기본 사용법"
              description="일반 Markdown 문법을 먼저 쓰고, 강조가 필요한 부분에만 컴포넌트를 더합니다."
            />
            <div className="mt-6 grid gap-4">
              {markdownExamples.map((example) => (
                <ExampleCard
                  key={example.id}
                  id={example.id}
                  title={example.title}
                  description={example.description}
                  preview={example.preview}
                  code={example.code}
                />
              ))}
            </div>
          </section>

          <section className="py-8 sm:py-10">
            <SectionHeader
              eyebrow="Components"
              title="MDX 컴포넌트"
              description="현재 포스트 렌더러에 등록된 컴포넌트와 사용 예시입니다."
            />
            <div className="mt-6 grid gap-5">
              {componentDocs.map((component) => (
                <ExampleCard
                  key={component.name}
                  id={component.name.toLowerCase()}
                  title={component.name}
                  description={component.description}
                  preview={component.preview}
                  code={component.code}
                  note={component.note}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function TocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/45 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      {children}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">{description}</p>
    </header>
  );
}

function ExampleCard({
  id,
  title,
  description,
  preview,
  code,
  note,
}: {
  id: string;
  title: string;
  description: string;
  preview: ReactNode;
  code: string;
  note?: string;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-8 overflow-hidden rounded-2xl border border-border/80 bg-background"
    >
      <div className="border-b border-border/70 px-5 py-4">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
        {note ? <p className="mt-2 text-sm leading-6 text-muted-foreground/85">{note}</p> : null}
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0 border-b border-border/70 bg-muted/10 p-5 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Preview
          </p>
          <div className="min-w-0">{preview}</div>
        </div>
        <div className="min-w-0 bg-muted/25 p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            MDX
          </p>
          <CodeSnippet code={code} />
        </div>
      </div>
    </article>
  );
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-border/80 bg-background px-4 py-4 text-[0.92rem] leading-7 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
      <code>{code}</code>
    </pre>
  );
}
