import Link from "next/link";
import type { ReactNode } from "react";
import { CopyCodeButton } from "@/features/design/copy-code-button";
import {
  AsideNote,
  Callout,
  Checklist,
  CodePanel,
  CompareBox,
  DefinitionBox,
  DoDont,
  FileTree,
  ImageFrame,
  InsightCard,
  KeyPoint,
  LeadText,
  MermaidDiagram,
  MiniCardGrid,
  QuoteBlock,
  ResourceLinks,
  SectionBreak,
  Spotlight,
  StepList,
  SummaryBox,
  TerminalBlock,
  Timeline,
  ToolGrid,
} from "@/components/mdx";

export type MdxGuideDoc = {
  slug: string;
  title: string;
  category: "basic" | "component";
  description: string;
  code: string;
  preview: ReactNode;
  note?: string;
  aliases?: string[];
};

export const basicDocs: MdxGuideDoc[] = [
  {
    slug: "제목과 문단",
    title: "제목과 문단",
    category: "basic",
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
    slug: "목록과 체크리스트",
    title: "목록과 체크리스트",
    category: "basic",
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
    slug: "코드블록",
    title: "코드블록",
    category: "basic",
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
    slug: "표",
    title: "표",
    category: "basic",
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
    slug: "mermaid-다이어그램",
    title: "Mermaid 다이어그램",
    category: "basic",
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

export const componentDocs: MdxGuideDoc[] = [
  {
    slug: "leadtext",
    title: "LeadText",
    category: "component",
    description: "도입부에서 글의 첫 인상을 조금 더 크게 보여줄 때 사용합니다.",
    code: ["<LeadText>", "  블로그 글의 시작 문장을 더 또렷하게 보여줍니다.", "</LeadText>"].join("\n"),
    preview: <LeadText>블로그 글의 시작 문장을 더 또렷하게 보여줍니다.</LeadText>,
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    category: "component",
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
    slug: "keypoint",
    title: "KeyPoint",
    category: "component",
    description: "글 중간의 핵심 포인트를 짧게 짚고 넘어갈 때 사용합니다.",
    code: [
      '<KeyPoint title="기억할 점" tone="info" variant="soft">',
      "  MDX 컴포넌트는 글의 흐름을 끊지 않는 선에서만 사용합니다.",
      "</KeyPoint>",
    ].join("\n"),
    preview: (
      <KeyPoint title="기억할 점" tone="info" variant="soft">
        MDX 컴포넌트는 글의 흐름을 끊지 않는 선에서만 사용합니다.
      </KeyPoint>
    ),
  },
  {
    slug: "callout",
    title: "Callout",
    category: "component",
    description: "정보, 주의, 성공 같은 상태를 가진 안내 문장을 담습니다.",
    code: [
      '<Callout tone="warning" title="배포 전 확인" size="md" variant="soft">',
      "  배포 전에 로컬에서 링크와 이미지 경로를 다시 확인합니다.",
      "</Callout>",
    ].join("\n"),
    preview: (
      <Callout tone="warning" title="배포 전 확인" size="md" variant="soft">
        배포 전에 로컬에서 링크와 이미지 경로를 다시 확인합니다.
      </Callout>
    ),
    note: "tone은 neutral, info, note, warning, success, danger를 사용할 수 있습니다.",
    aliases: ["collout"],
  },
  {
    slug: "asidenote",
    title: "AsideNote",
    category: "component",
    description: "본문 흐름에서 살짝 벗어난 참고 설명을 작게 덧붙입니다.",
    code: [
      '<AsideNote title="잠깐" tone="neutral" size="sm" variant="dashed">',
      "  이 블로그의 글은 content-source/posts에서 관리합니다.",
      "</AsideNote>",
    ].join("\n"),
    preview: (
      <AsideNote title="잠깐" tone="neutral" size="sm" variant="dashed">
        이 블로그의 글은 content-source/posts에서 관리합니다.
      </AsideNote>
    ),
  },
  {
    slug: "definitionbox",
    title: "DefinitionBox",
    category: "component",
    description: "용어를 처음 소개할 때 정의와 설명을 함께 보여줍니다.",
    code: [
      "<DefinitionBox",
      '  term="MDX"',
      '  description="Markdown 안에서 React 컴포넌트를 함께 사용할 수 있는 글 형식입니다."',
      '  tone="info"',
      '  variant="outline"',
      "/>",
    ].join("\n"),
    preview: (
      <DefinitionBox
        term="MDX"
        description="Markdown 안에서 React 컴포넌트를 함께 사용할 수 있는 글 형식입니다."
        tone="info"
        variant="outline"
      />
    ),
  },
  {
    slug: "summarybox",
    title: "SummaryBox",
    category: "component",
    description: "섹션 마지막에 기억할 내용을 bullet로 정리합니다.",
    code: [
      "<SummaryBox",
      '  title="요약"',
      '  tone="success"',
      '  size="sm"',
      '  items="MDX는 글과 컴포넌트를 함께 쓴다|코드블록은 언어를 붙인다|컴포넌트는 필요한 곳에만 쓴다"',
      "/>",
    ].join("\n"),
    preview: (
      <SummaryBox
        title="요약"
        tone="success"
        size="sm"
        items="MDX는 글과 컴포넌트를 함께 쓴다|코드블록은 언어를 붙인다|컴포넌트는 필요한 곳에만 쓴다"
      />
    ),
    note: "items는 배열 또는 | 로 구분한 문자열을 받을 수 있습니다.",
  },
  {
    slug: "checklist",
    title: "Checklist",
    category: "component",
    description: "발행 전 점검 항목처럼 체크해야 할 일을 정리합니다.",
    code: [
      "<Checklist",
      '  title="발행 전 체크"',
      '  tone="info"',
      '  items="frontmatter 확인|이미지 경로 확인|모바일 화면 확인"',
      "/>",
    ].join("\n"),
    preview: (
      <Checklist
        title="발행 전 체크"
        tone="info"
        items="frontmatter 확인|이미지 경로 확인|모바일 화면 확인"
      />
    ),
  },
  {
    slug: "steplist",
    title: "StepList",
    category: "component",
    description: "순서가 중요한 작업을 단계별로 보여줍니다.",
    code: ['<StepList tone="info" items="초안 작성|로컬에서 미리보기|수정 후 발행" />'].join("\n"),
    preview: <StepList tone="info" items="초안 작성|로컬에서 미리보기|수정 후 발행" />,
  },
  {
    slug: "comparebox",
    title: "CompareBox",
    category: "component",
    description: "두 선택지의 차이를 나란히 비교합니다.",
    code: [
      "<CompareBox",
      '  leftTitle="Markdown"',
      '  rightTitle="MDX"',
      '  leftItems="문서 작성에 집중|문법이 단순함"',
      '  rightItems="컴포넌트 사용 가능|표현을 확장하기 좋음"',
      '  leftTone="neutral"',
      '  rightTone="info"',
      "/>",
    ].join("\n"),
    preview: (
      <CompareBox
        leftTitle="Markdown"
        rightTitle="MDX"
        leftItems="문서 작성에 집중|문법이 단순함"
        rightItems="컴포넌트 사용 가능|표현을 확장하기 좋음"
        leftTone="neutral"
        rightTone="info"
      />
    ),
  },
  {
    slug: "minicardgrid",
    title: "MiniCardGrid",
    category: "component",
    description: "짧은 개념 여러 개를 카드 형태로 훑게 합니다.",
    code: [
      "<MiniCardGrid",
      '  tone="neutral"',
      '  variant="soft"',
      '  items="remark: Markdown을 다룬다|rehype: HTML 단계에서 다듬는다|MDXRemote: 글을 렌더링한다"',
      "/>",
    ].join("\n"),
    preview: (
      <MiniCardGrid
        tone="neutral"
        variant="soft"
        items="remark: Markdown을 다룬다|rehype: HTML 단계에서 다듬는다|MDXRemote: 글을 렌더링한다"
      />
    ),
  },
  {
    slug: "toolgrid",
    title: "ToolGrid",
    category: "component",
    description: "라이브러리나 도구의 역할을 짧은 카드로 정리합니다.",
    code: [
      "<ToolGrid",
      '  columns="2"',
      '  tone="info"',
      '  items="next-mdx-remote: MDX 문자열을 서버에서 렌더링한다|gray-matter: frontmatter를 분리한다"',
      "/>",
    ].join("\n"),
    preview: (
      <ToolGrid
        columns="2"
        tone="info"
        items="next-mdx-remote: MDX 문자열을 서버에서 렌더링한다|gray-matter: frontmatter를 분리한다"
      />
    ),
  },
  {
    slug: "resourcelinks",
    title: "ResourceLinks",
    category: "component",
    description: "Wiki, 공식 문서, 참고 링크를 한곳에 묶어 보여줍니다.",
    code: [
      "<ResourceLinks",
      '  title="관련 문서"',
      '  tone="info"',
      '  items="Publishing Posts:https://github.com/yunkooo/blog/wiki/Publishing-Posts|Troubleshooting:https://github.com/yunkooo/blog/wiki/Troubleshooting"',
      "/>",
    ].join("\n"),
    preview: (
      <ResourceLinks
        title="관련 문서"
        tone="info"
        items="Publishing Posts:https://github.com/yunkooo/blog/wiki/Publishing-Posts|Troubleshooting:https://github.com/yunkooo/blog/wiki/Troubleshooting"
      />
    ),
  },
  {
    slug: "insightcard",
    title: "InsightCard",
    category: "component",
    description: "삽질 끝에 배운 점이나 회고성 문장을 담습니다.",
    code: [
      '<InsightCard title="배운 점" tone="success" variant="outline">',
      "  처음부터 완벽히 만들기보다 불편한 부분을 발견하며 고쳐가는 편이 오래갑니다.",
      "</InsightCard>",
    ].join("\n"),
    preview: (
      <InsightCard title="배운 점" tone="success" variant="outline">
        처음부터 완벽히 만들기보다 불편한 부분을 발견하며 고쳐가는 편이 오래갑니다.
      </InsightCard>
    ),
  },
  {
    slug: "quoteblock",
    title: "QuoteBlock",
    category: "component",
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
    slug: "sectionbreak",
    title: "SectionBreak",
    category: "component",
    description: "글의 장면이 바뀔 때 시각적인 쉼표를 넣습니다.",
    code: ['<SectionBreak label="next" />'].join("\n"),
    preview: <SectionBreak label="next" />,
  },
  {
    slug: "timeline",
    title: "Timeline",
    category: "component",
    description: "작업 순서나 운영 흐름을 시간순으로 보여줍니다.",
    code: ['<Timeline tone="success" items="글 작성|blog-posts에 커밋|blog에서 pointer 갱신|Vercel 배포" />'].join("\n"),
    preview: <Timeline tone="success" items="글 작성|blog-posts에 커밋|blog에서 pointer 갱신|Vercel 배포" />,
  },
  {
    slug: "dodont",
    title: "DoDont",
    category: "component",
    description: "권장하는 방식과 피해야 할 방식을 나란히 비교합니다.",
    code: [
      "<DoDont",
      '  size="sm"',
      '  doItems="draft 값을 확인한다|pointer 변경을 배포 기준으로 삼는다"',
      '  dontItems="blog-posts push만으로 공개된다고 생각하지 않는다"',
      "/>",
    ].join("\n"),
    preview: (
      <DoDont
        size="sm"
        doItems="draft 값을 확인한다|pointer 변경을 배포 기준으로 삼는다"
        dontItems="blog-posts push만으로 공개된다고 생각하지 않는다"
      />
    ),
  },
  {
    slug: "codepanel",
    title: "CodePanel",
    category: "component",
    description: "파일명이나 설명이 필요한 코드 예시를 묶어서 보여줍니다.",
    code: [
      "<CodePanel",
      '  title="app/page.tsx"',
      '  language="tsx"',
      '  size="sm"',
      "  code={'export default function Page() {\\n  return <main />;\\n}'}",
      "/>",
    ].join("\n"),
    preview: (
      <CodePanel
        title="app/page.tsx"
        language="tsx"
        size="sm"
        code={["export default function Page() {", "  return <main />;", "}"].join("\n")}
      />
    ),
  },
  {
    slug: "terminalblock",
    title: "TerminalBlock",
    category: "component",
    description: "터미널에서 실행한 명령을 실제 콘솔처럼 보여줍니다.",
    code: [
      "<TerminalBlock",
      '  title="local"',
      '  size="sm"',
      '  code="npm run dev|npm run lint"',
      "/>",
    ].join("\n"),
    preview: <TerminalBlock title="local" size="sm" code="npm run dev|npm run lint" />,
  },
  {
    slug: "filetree",
    title: "FileTree",
    category: "component",
    description: "폴더 구조를 설명할 때 사용합니다.",
    code: [
      "<FileTree",
      '  title="posts"',
      '  size="sm"',
      '  code="content-source/|  posts/|    building-my-blog-with-nextjs-mdx.mdx"',
      "/>",
    ].join("\n"),
    preview: (
      <FileTree
        title="posts"
        size="sm"
        code="content-source/|  posts/|    building-my-blog-with-nextjs-mdx.mdx"
      />
    ),
  },
  {
    slug: "imageframe",
    title: "ImageFrame",
    category: "component",
    description: "스크린샷이나 이미지를 캡션과 함께 정돈해서 보여줍니다.",
    code: [
      "<ImageFrame",
      '  src="/blog-logo.svg"',
      '  alt="yunkoo.dev 로고"',
      '  caption="이미지나 스크린샷에 짧은 설명을 붙일 수 있습니다."',
      '  tone="neutral"',
      "/>",
    ].join("\n"),
    preview: (
      <ImageFrame
        src="/blog-logo.svg"
        alt="yunkoo.dev 로고"
        caption="이미지나 스크린샷에 짧은 설명을 붙일 수 있습니다."
        tone="neutral"
      />
    ),
  },
  {
    slug: "mermaiddiagram",
    title: "MermaidDiagram",
    category: "component",
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

export const allMdxGuideDocs = [...basicDocs, ...componentDocs];

export function getMdxGuideHref(doc: MdxGuideDoc) {
  return `/design/mdx/${encodeURIComponent(doc.slug)}`;
}

export function getMdxGuideDocBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);

  return allMdxGuideDocs.find((doc) => {
    if (normalizeSlug(doc.slug) === normalizedSlug) {
      return true;
    }

    return doc.aliases?.some((alias) => normalizeSlug(alias) === normalizedSlug) ?? false;
  });
}

export function getMdxGuideStaticParams() {
  return allMdxGuideDocs.flatMap((doc) => [
    { slug: doc.slug },
    ...(doc.aliases ?? []).map((alias) => ({ slug: alias })),
  ]);
}

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

export function MdxGuideLayout({
  activeSlug,
  children,
}: {
  activeSlug?: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <MdxGuideSidebar activeSlug={activeSlug} />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}

export function MdxGuideSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-background to-transparent"
        />
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="px-2 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Design / MDX
          </p>
          <nav
            aria-label="Design guide sections"
            className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            <TocGroup title="소개">
              <TocLink href="/design" isActive={!activeSlug}>
                디자인 가이드
              </TocLink>
            </TocGroup>

            <TocGroup title="MDX 기본">
              {basicDocs.map((doc) => (
                <TocLink
                  key={doc.slug}
                  href={getMdxGuideHref(doc)}
                  isActive={normalizeSlug(activeSlug ?? "") === normalizeSlug(doc.slug)}
                >
                  {doc.title}
                </TocLink>
              ))}
            </TocGroup>

            <TocGroup title="MDX 컴포넌트">
              {componentDocs.map((doc) => (
                <TocLink
                  key={doc.slug}
                  href={getMdxGuideHref(doc)}
                  isActive={normalizeSlug(activeSlug ?? "") === normalizeSlug(doc.slug)}
                >
                  {doc.title}
                </TocLink>
              ))}
            </TocGroup>
          </nav>
        </div>
      </div>
    </aside>
  );
}

function TocGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="border-b border-border/70 px-2 pb-2 text-base font-semibold text-foreground">
        {title}
      </p>
      <div className="mt-2 grid gap-1">{children}</div>
    </div>
  );
}

function TocLink({
  href,
  isActive = false,
  children,
}: {
  href: string;
  isActive?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
        isActive
          ? "bg-muted/65 text-foreground"
          : "text-muted-foreground hover:bg-muted/45 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export function SectionHeader({
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

export function ExampleCard({ doc }: { doc: MdxGuideDoc }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border/80 bg-background">
      <div className="border-b border-border/70 px-5 py-4">
        <h2 className="text-2xl font-semibold tracking-tight">{doc.title}</h2>
        <p className="mt-2 leading-7 text-muted-foreground">{doc.description}</p>
        {doc.note ? <p className="mt-2 text-sm leading-6 text-muted-foreground/85">{doc.note}</p> : null}
      </div>
      <div>
        <div className="min-w-0 border-b border-border/70 bg-muted/10 p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Preview
          </p>
          <div className="min-w-0">{doc.preview}</div>
        </div>
        <div className="min-w-0 bg-muted/25 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              MDX
            </p>
            <CopyCodeButton code={doc.code} />
          </div>
          <CodeSnippet code={doc.code} />
        </div>
      </div>
    </article>
  );
}

export function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-border/80 bg-background px-4 py-4 text-[0.92rem] leading-7 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
      <code>{code}</code>
    </pre>
  );
}
