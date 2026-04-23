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
  examples?: MdxGuideExample[];
  aliases?: string[];
};

type MdxGuideExample = {
  title: string;
  code: string;
  preview?: ReactNode;
  note?: string;
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
    slug: "링크와 강조",
    title: "링크와 강조",
    category: "basic",
    description: "외부 문서로 이동시키거나 문장 안에서 중요한 단어를 살짝 강조합니다.",
    code: [
      "공식 문서는 [Next.js Docs](https://nextjs.org/docs)에서 확인합니다.",
      "",
      "글 안에서 **중요한 결정**은 굵게 표시합니다.",
      "",
      "`inline code`는 파일명이나 명령어를 짧게 보여줄 때 사용합니다.",
    ].join("\n"),
    preview: (
      <div className="space-y-3 leading-8 text-muted-foreground">
        <p>
          공식 문서는{" "}
          <span className="font-medium text-foreground underline underline-offset-4">
            Next.js Docs
          </span>
          에서 확인합니다.
        </p>
        <p>
          글 안에서 <strong className="text-foreground">중요한 결정</strong>은 굵게 표시합니다.
        </p>
        <p>
          <code className="rounded-md border border-border bg-muted/45 px-1.5 py-0.5">
            inline code
          </code>
          는 파일명이나 명령어를 짧게 보여줄 때 사용합니다.
        </p>
      </div>
    ),
    note: "외부 링크는 글 렌더러에서 새 탭으로 열리도록 처리됩니다.",
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
    examples: [
      {
        title: "순서가 있는 목록",
        code: ["1. 초안 작성", "2. 로컬에서 미리보기", "3. 발행 여부 확인"].join("\n"),
        preview: (
          <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
            <li>초안 작성</li>
            <li>로컬에서 미리보기</li>
            <li>발행 여부 확인</li>
          </ol>
        ),
      },
    ],
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
    examples: [
      {
        title: "파일명을 문장으로 먼저 알려주기",
        code: [
          "`src/app/page.tsx`에서 페이지 컴포넌트를 수정합니다.",
          "",
          "```tsx",
          "export default function Page() {",
          "  return <main>Home</main>;",
          "}",
          "```",
        ].join("\n"),
        preview: (
          <div className="space-y-3">
            <p className="text-muted-foreground">
              <code className="rounded-md border border-border bg-muted/45 px-1.5 py-0.5">
                src/app/page.tsx
              </code>
              에서 페이지 컴포넌트를 수정합니다.
            </p>
            <CodeSnippet
              code={["export default function Page() {", "  return <main>Home</main>;", "}"].join(
                "\n",
              )}
            />
          </div>
        ),
      },
    ],
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
    slug: "tone-사용법",
    title: "tone 사용법",
    category: "component",
    description:
      "tone은 컴포넌트의 감정을 정하는 값입니다. 내용의 성격에 맞춰 neutral, info, success, warning, danger 중 하나를 고릅니다.",
    code: [
      '<Callout tone="info" title="정보">',
      "  독자가 알아두면 좋은 배경 설명을 적습니다.",
      "</Callout>",
      "",
      '<Callout tone="success" title="완료">',
      "  잘 끝난 작업이나 좋은 결론을 정리합니다.",
      "</Callout>",
      "",
      '<Callout tone="warning" title="주의">',
      "  놓치기 쉬운 확인 사항을 알려줍니다.",
      "</Callout>",
    ].join("\n"),
    preview: <ToneGuidePreview />,
    note:
      "처음에는 neutral은 일반 설명, info는 참고 정보, success는 완료/좋은 결론, warning은 주의, danger는 위험/실패 가능성으로 기억하면 충분합니다.",
    examples: [
      {
        title: "tone을 고르는 빠른 기준",
        code: [
          "neutral: 일반 메모나 차분한 정리",
          "info: 배경지식, 참고 설명, 팁",
          "success: 완료, 좋은 결론, 권장 흐름",
          "warning: 실수하기 쉬운 부분, 발행 전 확인",
          "danger: 데이터 삭제, 실패 가능성, 강한 주의",
        ].join("\n"),
        preview: <ToneReferenceList />,
      },
      {
        title: "같은 문장을 tone만 바꿔 비교하기",
        code: [
          '<KeyPoint title="발행 전 확인" tone="info">',
          "  이미지를 올렸는지 확인합니다.",
          "</KeyPoint>",
          "",
          '<KeyPoint title="발행 전 확인" tone="warning">',
          "  이미지를 올리지 않으면 본문에서 깨져 보일 수 있습니다.",
          "</KeyPoint>",
          "",
          '<KeyPoint title="삭제 주의" tone="danger">',
          "  원격 브랜치를 지우기 전에는 반드시 대상 브랜치를 다시 확인합니다.",
          "</KeyPoint>",
        ].join("\n"),
        preview: (
          <div className="space-y-3">
            <KeyPoint title="발행 전 확인" tone="info">
              이미지를 올렸는지 확인합니다.
            </KeyPoint>
            <KeyPoint title="발행 전 확인" tone="warning">
              이미지를 올리지 않으면 본문에서 깨져 보일 수 있습니다.
            </KeyPoint>
            <KeyPoint title="삭제 주의" tone="danger">
              원격 브랜치를 지우기 전에는 반드시 대상 브랜치를 다시 확인합니다.
            </KeyPoint>
          </div>
        ),
      },
    ],
  },
  {
    slug: "leadtext",
    title: "LeadText",
    category: "component",
    description: "도입부에서 글의 첫 인상을 조금 더 크게 보여줄 때 사용합니다.",
    code: ["<LeadText>", "  블로그 글의 시작 문장을 더 또렷하게 보여줍니다.", "</LeadText>"].join("\n"),
    preview: <LeadText>블로그 글의 시작 문장을 더 또렷하게 보여줍니다.</LeadText>,
    note: "글의 첫 문단이나 큰 섹션을 여는 문장에만 가볍게 사용하는 편이 좋습니다.",
    examples: [
      {
        title: "회고 글 도입",
        code: [
          "<LeadText>",
          "  이번 글은 블로그를 만들면서 가장 많이 헤맸던 부분을 정리한 기록입니다.",
          "</LeadText>",
        ].join("\n"),
        preview: (
          <LeadText>
            이번 글은 블로그를 만들면서 가장 많이 헤맸던 부분을 정리한 기록입니다.
          </LeadText>
        ),
      },
    ],
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
    note: "title을 생략하면 기본값은 '핵심'입니다. tone, size, variant로 분위기를 조절할 수 있습니다.",
    examples: [
      {
        title: "주의 깊게 읽어야 하는 결론",
        code: [
          '<Spotlight title="결론" tone="warning" variant="soft">',
          "  자동화는 편하지만, 발행 전에는 실제 페이지에서 한 번 더 확인합니다.",
          "</Spotlight>",
        ].join("\n"),
        preview: (
          <Spotlight title="결론" tone="warning" variant="soft">
            자동화는 편하지만, 발행 전에는 실제 페이지에서 한 번 더 확인합니다.
          </Spotlight>
        ),
      },
    ],
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
    note: "title은 필수입니다. icon을 넘기지 않으면 기본 아이콘이 함께 표시됩니다.",
    examples: [
      {
        title: "짧은 원칙 강조",
        code: [
          '<KeyPoint title="작성 원칙" tone="success" variant="outline">',
          "  한 문단에는 하나의 생각만 담으면 나중에 고치기 쉽습니다.",
          "</KeyPoint>",
        ].join("\n"),
        preview: (
          <KeyPoint title="작성 원칙" tone="success" variant="outline">
            한 문단에는 하나의 생각만 담으면 나중에 고치기 쉽습니다.
          </KeyPoint>
        ),
      },
    ],
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
    examples: [
      {
        title: "성공 상태 안내",
        code: [
          '<Callout tone="success" title="완료">',
          "  글 초안과 이미지 경로를 모두 확인했습니다.",
          "</Callout>",
        ].join("\n"),
        preview: (
          <Callout tone="success" title="완료">
            글 초안과 이미지 경로를 모두 확인했습니다.
          </Callout>
        ),
      },
      {
        title: "위험한 작업 경고",
        code: [
          '<Callout tone="danger" title="주의">',
          "  커밋 전에 content-source/posts 변경이 섞이지 않았는지 확인합니다.",
          "</Callout>",
        ].join("\n"),
        preview: (
          <Callout tone="danger" title="주의">
            커밋 전에 content-source/posts 변경이 섞이지 않았는지 확인합니다.
          </Callout>
        ),
      },
    ],
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
    note: "본문의 중심 내용은 아니지만 독자가 알아두면 좋은 보조 설명에 사용합니다.",
    examples: [
      {
        title: "작은 팁",
        code: [
          '<AsideNote title="팁" tone="info" variant="soft">',
          "  코드블록에는 가능한 한 언어 이름을 붙이면 읽기 좋습니다.",
          "</AsideNote>",
        ].join("\n"),
        preview: (
          <AsideNote title="팁" tone="info" variant="soft">
            코드블록에는 가능한 한 언어 이름을 붙이면 읽기 좋습니다.
          </AsideNote>
        ),
      },
    ],
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
    note: "term과 description은 필수입니다. title은 생략하면 Definition으로 표시됩니다.",
    examples: [
      {
        title: "기술 용어 정의",
        code: [
          "<DefinitionBox",
          '  title="용어"',
          '  term="SSG"',
          '  description="빌드 시점에 HTML을 미리 만들어두는 렌더링 방식입니다."',
          '  tone="neutral"',
          "/>",
        ].join("\n"),
        preview: (
          <DefinitionBox
            title="용어"
            term="SSG"
            description="빌드 시점에 HTML을 미리 만들어두는 렌더링 방식입니다."
            tone="neutral"
          />
        ),
      },
    ],
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
    examples: [
      {
        title: "섹션 마지막 정리",
        code: [
          "<SummaryBox",
          '  title="이번 섹션에서 기억할 것"',
          '  items="문제는 작게 쪼갠다|불확실한 부분은 글로 남긴다|다음 작업을 하나만 정한다"',
          "/>",
        ].join("\n"),
        preview: (
          <SummaryBox
            title="이번 섹션에서 기억할 것"
            items="문제는 작게 쪼갠다|불확실한 부분은 글로 남긴다|다음 작업을 하나만 정한다"
          />
        ),
      },
    ],
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
    note: "title은 생략하면 '체크리스트'로 표시됩니다. 완료 여부를 표현하기보다 점검 항목을 모으는 용도입니다.",
    examples: [
      {
        title: "리뷰 요청 전 점검",
        code: [
          "<Checklist",
          '  title="리뷰 전에 보기"',
          '  tone="warning"',
          '  items="제목이 너무 길지 않은지 확인|코드 예시가 실행 가능한지 확인|링크가 열리는지 확인"',
          "/>",
        ].join("\n"),
        preview: (
          <Checklist
            title="리뷰 전에 보기"
            tone="warning"
            items="제목이 너무 길지 않은지 확인|코드 예시가 실행 가능한지 확인|링크가 열리는지 확인"
          />
        ),
      },
    ],
  },
  {
    slug: "steplist",
    title: "StepList",
    category: "component",
    description: "순서가 중요한 작업을 단계별로 보여줍니다.",
    code: ['<StepList tone="info" items="초안 작성|로컬에서 미리보기|수정 후 발행" />'].join("\n"),
    preview: <StepList tone="info" items="초안 작성|로컬에서 미리보기|수정 후 발행" />,
    note: "각 item은 자동으로 번호가 붙습니다. 긴 문장보다는 행동 단위로 짧게 쓰면 좋습니다.",
    examples: [
      {
        title: "문제 해결 순서",
        code: [
          "<StepList",
          '  tone="neutral"',
          '  variant="outline"',
          '  items="에러 메시지를 그대로 읽는다|관련 파일을 하나씩 확인한다|작게 수정하고 다시 실행한다"',
          "/>",
        ].join("\n"),
        preview: (
          <StepList
            tone="neutral"
            variant="outline"
            items="에러 메시지를 그대로 읽는다|관련 파일을 하나씩 확인한다|작게 수정하고 다시 실행한다"
          />
        ),
      },
    ],
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
    note: "leftItems와 rightItems는 | 로 구분합니다. 두 선택지를 같은 기준으로 비교할 때 가장 읽기 좋습니다.",
    examples: [
      {
        title: "운영 방식 비교",
        code: [
          "<CompareBox",
          '  leftTitle="수동 확인"',
          '  rightTitle="자동 검증"',
          '  leftItems="맥락을 직접 판단하기 좋음|시간이 더 걸림"',
          '  rightItems="반복 작업에 강함|초기 설정이 필요함"',
          '  leftTone="neutral"',
          '  rightTone="success"',
          "/>",
        ].join("\n"),
        preview: (
          <CompareBox
            leftTitle="수동 확인"
            rightTitle="자동 검증"
            leftItems="맥락을 직접 판단하기 좋음|시간이 더 걸림"
            rightItems="반복 작업에 강함|초기 설정이 필요함"
            leftTone="neutral"
            rightTone="success"
          />
        ),
      },
    ],
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
    note: "items는 '제목: 설명' 형식으로 쓰면 카드 안에 제목과 설명이 나뉘어 표시됩니다.",
    examples: [
      {
        title: "3열 카드",
        code: [
          "<MiniCardGrid",
          '  columns="3"',
          '  tone="info"',
          '  items="초안: 생각을 빠르게 적는다|검토: 흐름을 다듬는다|발행: 링크와 이미지를 확인한다"',
          "/>",
        ].join("\n"),
        preview: (
          <MiniCardGrid
            columns="3"
            tone="info"
            items="초안: 생각을 빠르게 적는다|검토: 흐름을 다듬는다|발행: 링크와 이미지를 확인한다"
          />
        ),
      },
    ],
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
    note: "MiniCardGrid와 비슷하지만, 라이브러리나 도구 역할을 나열할 때 이름이 더 잘 맞습니다.",
    examples: [
      {
        title: "블로그 작성 도구",
        code: [
          "<ToolGrid",
          '  columns="3"',
          '  variant="soft"',
          '  items="MDX: 글과 컴포넌트를 함께 쓴다|Mermaid: 흐름도를 코드로 그린다|Vercel: 정적 페이지를 배포한다"',
          "/>",
        ].join("\n"),
        preview: (
          <ToolGrid
            columns="3"
            variant="soft"
            items="MDX: 글과 컴포넌트를 함께 쓴다|Mermaid: 흐름도를 코드로 그린다|Vercel: 정적 페이지를 배포한다"
          />
        ),
      },
    ],
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
    note: "items는 '라벨:URL' 또는 URL만 쓸 수 있습니다. 외부 링크는 새 탭으로 열립니다.",
    examples: [
      {
        title: "내부 참고 링크",
        code: [
          "<ResourceLinks",
          '  title="같이 보면 좋은 글"',
          '  items="블로그 글 목록:/posts|디자인 가이드:/design"',
          "/>",
        ].join("\n"),
        preview: (
          <ResourceLinks title="같이 보면 좋은 글" items="블로그 글 목록:/posts|디자인 가이드:/design" />
        ),
      },
    ],
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
    note: "회고, 깨달음, 작업 중 얻은 판단 기준처럼 개인적인 배움을 담을 때 잘 어울립니다.",
    examples: [
      {
        title: "실패에서 배운 점",
        code: [
          '<InsightCard title="다음에는 이렇게" tone="warning" variant="soft">',
          "  자동화보다 먼저 수동으로 한 번 성공시키면, 어떤 단계를 자동화해야 하는지 더 잘 보입니다.",
          "</InsightCard>",
        ].join("\n"),
        preview: (
          <InsightCard title="다음에는 이렇게" tone="warning" variant="soft">
            자동화보다 먼저 수동으로 한 번 성공시키면, 어떤 단계를 자동화해야 하는지 더 잘 보입니다.
          </InsightCard>
        ),
      },
    ],
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
    note: "source는 선택값입니다. 출처가 없는 개인 메모라면 생략해도 됩니다.",
    examples: [
      {
        title: "출처 없는 짧은 인용",
        code: ["<QuoteBlock>", "  일단 기록해두면, 나중의 내가 이어받을 수 있습니다.", "</QuoteBlock>"].join(
          "\n",
        ),
        preview: <QuoteBlock>일단 기록해두면, 나중의 내가 이어받을 수 있습니다.</QuoteBlock>,
      },
    ],
  },
  {
    slug: "sectionbreak",
    title: "SectionBreak",
    category: "component",
    description: "글의 장면이 바뀔 때 시각적인 쉼표를 넣습니다.",
    code: ['<SectionBreak label="next" />'].join("\n"),
    preview: <SectionBreak label="next" />,
    note: "label을 생략하면 가운데 점 표시만 나옵니다. 너무 자주 쓰면 글 흐름이 끊겨 보일 수 있습니다.",
    examples: [
      {
        title: "라벨 없는 구분선",
        code: ["<SectionBreak />"].join("\n"),
        preview: <SectionBreak />,
      },
    ],
  },
  {
    slug: "timeline",
    title: "Timeline",
    category: "component",
    description: "작업 순서나 운영 흐름을 시간순으로 보여줍니다.",
    code: ['<Timeline tone="success" items="글 작성|blog-posts에 커밋|blog에서 pointer 갱신|Vercel 배포" />'].join("\n"),
    preview: <Timeline tone="success" items="글 작성|blog-posts에 커밋|blog에서 pointer 갱신|Vercel 배포" />,
    note: "StepList보다 과정의 흐름을 보여주는 느낌이 강합니다. 운영 기록이나 변경 이력에 좋습니다.",
    examples: [
      {
        title: "버그 수정 흐름",
        code: [
          "<Timeline",
          '  tone="info"',
          '  items="증상 확인|재현 경로 기록|원인 파일 찾기|수정 후 빌드 확인"',
          "/>",
        ].join("\n"),
        preview: (
          <Timeline
            tone="info"
            items="증상 확인|재현 경로 기록|원인 파일 찾기|수정 후 빌드 확인"
          />
        ),
      },
    ],
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
    note: "doTitle, dontTitle로 제목을 바꿀 수 있습니다. 권장/비권장 기준이 분명할 때 사용합니다.",
    examples: [
      {
        title: "글쓰기 기준",
        code: [
          "<DoDont",
          '  doTitle="좋은 예"',
          '  dontTitle="피하기"',
          '  doItems="한 문단에 하나의 생각을 쓴다|예시를 먼저 보여준다"',
          '  dontItems="긴 설명만 이어서 쓴다|맥락 없는 코드만 붙인다"',
          "/>",
        ].join("\n"),
        preview: (
          <DoDont
            doTitle="좋은 예"
            dontTitle="피하기"
            doItems="한 문단에 하나의 생각을 쓴다|예시를 먼저 보여준다"
            dontItems="긴 설명만 이어서 쓴다|맥락 없는 코드만 붙인다"
          />
        ),
      },
    ],
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
    note: "title은 필수입니다. language를 넣으면 오른쪽에 작은 메타 정보로 표시됩니다.",
    examples: [
      {
        title: "설정 파일 예시",
        code: [
          "<CodePanel",
          '  title="package.json"',
          '  language="json"',
          '  code={\'{\"scripts\":{\"build\":\"next build\"}}\'}',
          "/>",
        ].join("\n"),
        preview: (
          <CodePanel
            title="package.json"
            language="json"
            code={'{"scripts":{"build":"next build"}}'}
          />
        ),
      },
    ],
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
    note: "code는 줄바꿈 문자열이나 | 로 구분한 문자열을 받을 수 있습니다. 각 줄 앞에는 $ 표시가 붙습니다.",
    examples: [
      {
        title: "빌드 확인",
        code: ['<TerminalBlock title="verify" code="npm run lint|npm run build" />'].join("\n"),
        preview: <TerminalBlock title="verify" code="npm run lint|npm run build" />,
      },
    ],
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
    note: "들여쓰기는 code 문자열 안에 공백으로 표현합니다. 폴더 구조를 짧게 보여줄 때 사용합니다.",
    examples: [
      {
        title: "앱 라우트 구조",
        code: [
          "<FileTree",
          '  title="design routes"',
          '  code="src/app/(site)/|  design/|    page.tsx|    mdx/[slug]/page.tsx"',
          "/>",
        ].join("\n"),
        preview: (
          <FileTree
            title="design routes"
            code="src/app/(site)/|  design/|    page.tsx|    mdx/[slug]/page.tsx"
          />
        ),
      },
    ],
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
    note: "src와 alt는 필수입니다. caption은 선택값이고, 스크린샷 설명을 짧게 붙일 때 좋습니다.",
    examples: [
      {
        title: "캡션 없는 이미지",
        code: ['<ImageFrame src="/blog-logo.svg" alt="yunkoo.dev 로고" variant="soft" />'].join(
          "\n",
        ),
        preview: <ImageFrame src="/blog-logo.svg" alt="yunkoo.dev 로고" variant="soft" />,
      },
    ],
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
    examples: [
      {
        title: "선택 흐름",
        code: [
          "```mermaid",
          "flowchart TD",
          "  Start{draft 값 확인}",
          "  Start -->|true| Draft[초안 유지]",
          "  Start -->|false| Publish[글 목록에 노출]",
          "```",
        ].join("\n"),
        preview: (
          <MermaidDiagram
            chart={[
              "flowchart TD",
              "  Start{draft 값 확인}",
              "  Start -->|true| Draft[초안 유지]",
              "  Start -->|false| Publish[글 목록에 노출]",
            ].join("\n")}
          />
        ),
      },
    ],
  },
];

export const allMdxGuideDocs = [...basicDocs, ...componentDocs];

const toneSupportedSlugs = new Set([
  "spotlight",
  "keypoint",
  "callout",
  "asidenote",
  "definitionbox",
  "summarybox",
  "checklist",
  "steplist",
  "comparebox",
  "minicardgrid",
  "toolgrid",
  "resourcelinks",
  "insightcard",
  "timeline",
  "imageframe",
]);

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
        {toneSupportedSlugs.has(doc.slug) ? <ComponentToneHelp /> : null}
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
      {doc.examples?.length ? (
        <div className="border-t border-border/70 px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            More Examples
          </p>
          <div className="mt-4 grid gap-4">
            {doc.examples.map((example) => (
              <ExampleVariant key={`${doc.slug}-${example.title}`} example={example} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ExampleVariant({ example }: { example: MdxGuideExample }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/75 bg-muted/10">
      <div className="border-b border-border/70 px-4 py-3">
        <h3 className="font-medium tracking-tight">{example.title}</h3>
        {example.note ? (
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{example.note}</p>
        ) : null}
      </div>
      {example.preview ? (
        <div className="min-w-0 border-b border-border/70 bg-background p-4">
          {example.preview}
        </div>
      ) : null}
      <div className="min-w-0 bg-muted/25 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            MDX
          </p>
          <CopyCodeButton code={example.code} />
        </div>
        <CodeSnippet code={example.code} />
      </div>
    </section>
  );
}

function ComponentToneHelp() {
  return (
    <div className="mt-3 rounded-2xl border border-border/70 bg-muted/20 px-4 py-3 text-sm leading-6 text-muted-foreground">
      <p>
        <span className="font-medium text-foreground">tone 사용 팁:</span> 평범한 설명은
        neutral, 참고 정보는 info, 좋은 결론은 success, 주의할 점은 warning, 위험한 작업은
        danger를 먼저 떠올리면 됩니다. 자세한 기준은{" "}
        <Link
          href="/design/mdx/tone-사용법"
          className="font-medium text-foreground underline underline-offset-4"
        >
          tone 사용법
        </Link>
        에 모아두었습니다.
      </p>
    </div>
  );
}

function ToneGuidePreview() {
  return (
    <div className="space-y-3">
      <Callout tone="info" title="정보" size="sm">
        독자가 알아두면 좋은 배경 설명을 적습니다.
      </Callout>
      <Callout tone="success" title="완료" size="sm">
        잘 끝난 작업이나 좋은 결론을 정리합니다.
      </Callout>
      <Callout tone="warning" title="주의" size="sm">
        놓치기 쉬운 확인 사항을 알려줍니다.
      </Callout>
    </div>
  );
}

function ToneReferenceList() {
  const toneItems = [
    {
      tone: "neutral",
      label: "neutral",
      description: "일반 메모, 차분한 정리, 강조가 크지 않은 보조 설명",
    },
    {
      tone: "info",
      label: "info",
      description: "배경지식, 참고 설명, 팁, 독자가 알면 이해가 쉬워지는 정보",
    },
    {
      tone: "success",
      label: "success",
      description: "완료된 작업, 좋은 결론, 권장 흐름, 긍정적인 회고",
    },
    {
      tone: "warning",
      label: "warning",
      description: "실수하기 쉬운 부분, 발행 전 확인, 놓치면 문제가 생길 수 있는 내용",
    },
    {
      tone: "danger",
      label: "danger",
      description: "삭제, 실패 가능성, 강한 주의가 필요한 위험한 작업",
    },
  ] as const;

  return (
    <div className="grid gap-2">
      {toneItems.map(({ tone, label, description }) => (
        <div key={tone} className="grid gap-2 rounded-2xl border border-border/70 bg-background p-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm leading-6 text-muted-foreground">{description}</span>
        </div>
      ))}
    </div>
  );
}

export function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-border/80 bg-background px-4 py-4 text-[0.92rem] leading-7 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
      <code>{code}</code>
    </pre>
  );
}
