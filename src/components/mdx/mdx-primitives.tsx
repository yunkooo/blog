import type { ElementType, ReactNode } from "react";
import {
  normalizeCodeLines,
  normalizeDelimitedItems,
  type DelimitedItems,
} from "@/components/mdx/mdx-utils";

export type MdxTone = "neutral" | "info" | "success" | "warning" | "danger";
export type MdxSize = "sm" | "md" | "lg";
export type MdxVariant = "plain" | "soft" | "outline" | "dashed" | "solid";
export type MdxToneInput = MdxTone | "note";
export type MdxColumns = 1 | 2 | 3 | "1" | "2" | "3";

type MdxCardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

type MdxListProps = {
  items?: DelimitedItems;
  marker?: ReactNode | ((item: string, index: number) => ReactNode);
  ordered?: boolean;
  className?: string;
  itemClassName?: string;
  size?: MdxSize;
};

type MdxCodeFrameProps = {
  title?: string;
  meta?: string;
  code: string;
  variant?: "default" | "terminal" | "tree";
  size?: MdxSize;
};

type MdxHighlightProps = {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant | "strong" | "minimal";
};

export type MdxItemGridItem = {
  title: string;
  description?: string;
};

type MdxItemGridProps = {
  items: MdxItemGridItem[];
  columns?: MdxColumns;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
  className?: string;
};

const toneClasses: Record<
  MdxTone,
  {
    soft: string;
    plain: string;
    outline: string;
    dashed: string;
    solid: string;
    marker: string;
    subtleMarker: string;
    outlineMarker: string;
    text: string;
  }
> = {
  neutral: {
    soft: "border-border/80 bg-muted/30 text-foreground",
    plain: "border-border/80 bg-background text-foreground",
    outline: "border-border/80 bg-background text-foreground",
    dashed: "border-dashed border-border bg-muted/25 text-foreground",
    solid: "border-foreground bg-foreground text-background",
    marker: "bg-foreground text-background border-foreground",
    subtleMarker: "bg-muted/55 text-foreground border-foreground/20",
    outlineMarker: "border-muted-foreground/45 text-muted-foreground",
    text: "text-foreground",
  },
  info: {
    soft: "border-sky-500/20 bg-sky-500/10 text-foreground dark:border-sky-300/25 dark:bg-sky-300/10",
    plain: "border-sky-500/25 bg-background text-foreground dark:border-sky-300/25",
    outline: "border-sky-500/35 bg-background text-foreground dark:border-sky-300/35",
    dashed: "border-dashed border-sky-500/35 bg-sky-500/10 text-foreground dark:border-sky-300/35 dark:bg-sky-300/10",
    solid: "border-sky-700 bg-sky-700 text-white dark:border-sky-300 dark:bg-sky-300 dark:text-sky-950",
    marker: "bg-sky-600 text-white border-sky-600 dark:bg-sky-300 dark:text-sky-950 dark:border-sky-300",
    subtleMarker: "bg-sky-500/15 text-sky-900 border-sky-500/25 dark:text-sky-100 dark:border-sky-300/30",
    outlineMarker: "border-sky-600/45 text-sky-700 dark:border-sky-300/45 dark:text-sky-200",
    text: "text-sky-900 dark:text-sky-100",
  },
  success: {
    soft: "border-emerald-500/20 bg-emerald-500/10 text-foreground dark:border-emerald-300/25 dark:bg-emerald-300/10",
    plain: "border-emerald-500/25 bg-background text-foreground dark:border-emerald-300/25",
    outline: "border-emerald-500/35 bg-background text-foreground dark:border-emerald-300/35",
    dashed: "border-dashed border-emerald-500/35 bg-emerald-500/10 text-foreground dark:border-emerald-300/35 dark:bg-emerald-300/10",
    solid: "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-300 dark:bg-emerald-300 dark:text-emerald-950",
    marker:
      "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-300 dark:text-emerald-950 dark:border-emerald-300",
    subtleMarker:
      "bg-emerald-500/15 text-emerald-900 border-emerald-500/25 dark:text-emerald-100 dark:border-emerald-300/30",
    outlineMarker:
      "border-emerald-600/45 text-emerald-700 dark:border-emerald-300/45 dark:text-emerald-200",
    text: "text-emerald-900 dark:text-emerald-100",
  },
  warning: {
    soft: "border-amber-500/25 bg-amber-500/10 text-foreground dark:border-amber-300/25 dark:bg-amber-300/10",
    plain: "border-amber-500/30 bg-background text-foreground dark:border-amber-300/30",
    outline: "border-amber-500/40 bg-background text-foreground dark:border-amber-300/40",
    dashed: "border-dashed border-amber-500/40 bg-amber-500/10 text-foreground dark:border-amber-300/40 dark:bg-amber-300/10",
    solid: "border-amber-600 bg-amber-500 text-amber-950 dark:border-amber-300 dark:bg-amber-300",
    marker: "bg-amber-500 text-amber-950 border-amber-500 dark:bg-amber-300 dark:border-amber-300",
    subtleMarker:
      "bg-amber-500/15 text-amber-900 border-amber-500/30 dark:text-amber-100 dark:border-amber-300/30",
    outlineMarker: "border-amber-600/45 text-amber-700 dark:border-amber-300/45 dark:text-amber-200",
    text: "text-amber-900 dark:text-amber-100",
  },
  danger: {
    soft: "border-rose-500/20 bg-rose-500/10 text-foreground dark:border-rose-300/25 dark:bg-rose-300/10",
    plain: "border-rose-500/25 bg-background text-foreground dark:border-rose-300/25",
    outline: "border-rose-500/35 bg-background text-foreground dark:border-rose-300/35",
    dashed: "border-dashed border-rose-500/35 bg-rose-500/10 text-foreground dark:border-rose-300/35 dark:bg-rose-300/10",
    solid: "border-rose-700 bg-rose-700 text-white dark:border-rose-300 dark:bg-rose-300 dark:text-rose-950",
    marker: "bg-rose-600 text-white border-rose-600 dark:bg-rose-300 dark:text-rose-950 dark:border-rose-300",
    subtleMarker: "bg-rose-500/15 text-rose-900 border-rose-500/25 dark:text-rose-100 dark:border-rose-300/30",
    outlineMarker: "border-rose-600/45 text-rose-700 dark:border-rose-300/45 dark:text-rose-200",
    text: "text-rose-900 dark:text-rose-100",
  },
};

const cardSizeClasses: Record<MdxSize, string> = {
  sm: "px-4 py-3",
  md: "px-5 py-4",
  lg: "px-6 py-6",
};

const listSizeClasses: Record<MdxSize, string> = {
  sm: "gap-2 text-[0.96rem] leading-7",
  md: "gap-3 text-[1rem] leading-7",
  lg: "gap-3.5 text-[1.05rem] leading-8",
};

const codeSizeClasses: Record<MdxSize, string> = {
  sm: "!px-4 !py-3 !text-[0.9rem] !leading-7",
  md: "!px-4 !py-4 !text-[0.95rem] !leading-7",
  lg: "!px-5 !py-5 !text-[1rem] !leading-8",
};

const columnsClasses: Record<"1" | "2" | "3", string> = {
  "1": "grid-cols-1",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
};

const codeTokenClassNames = {
  keyword: "text-[#7d2cc8] dark:text-violet-300",
  string: "text-[#116329] dark:text-emerald-300",
  number: "text-[#8a4b0f] dark:text-amber-300",
  function: "text-[#0550ae] dark:text-sky-300",
  tag: "text-[#a40e26] dark:text-rose-300",
  attr: "text-[#7a4d00] dark:text-yellow-300",
  comment: "text-[#57606a] dark:text-muted-foreground",
  punctuation: "text-[#4b5563] dark:text-foreground/65",
  command: "text-[#0550ae] dark:text-sky-300",
  option: "text-[#8a4b0f] dark:text-amber-300",
};

export function normalizeMdxTone(tone: MdxToneInput = "neutral"): MdxTone {
  return tone === "note" ? "neutral" : tone;
}

export function getMdxToneClassName(tone: MdxToneInput = "neutral", variant: MdxVariant = "plain") {
  return toneClasses[normalizeMdxTone(tone)][variant];
}

export function getMdxMarkerClassName(tone: MdxToneInput = "neutral", subtle = false) {
  const normalizedTone = normalizeMdxTone(tone);
  return subtle ? toneClasses[normalizedTone].subtleMarker : toneClasses[normalizedTone].marker;
}

export function getMdxMarkerOutlineClassName(tone: MdxToneInput = "neutral") {
  return toneClasses[normalizeMdxTone(tone)].outlineMarker;
}

export function getMdxToneTextClassName(tone: MdxToneInput = "neutral") {
  return toneClasses[normalizeMdxTone(tone)].text;
}

export function MdxBlockTitle({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: MdxToneInput;
}) {
  return (
    <p
      className={joinClassNames(
        "text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground",
        tone !== "neutral" && tone !== "note" ? getMdxToneTextClassName(tone) : "",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function MdxCard({
  children,
  as: Component = "aside",
  className,
  tone = "neutral",
  size = "md",
  variant = "plain",
}: MdxCardProps) {
  return (
    <Component
      className={joinClassNames(
        "not-prose my-6 rounded-[1.35rem] border",
        getMdxToneClassName(tone, variant),
        cardSizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function MdxList({
  items,
  marker,
  ordered = false,
  className,
  itemClassName,
  size = "md",
}: MdxListProps) {
  const normalizedItems = normalizeDelimitedItems(items);
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={joinClassNames("grid list-none p-0", listSizeClasses[size], className)}>
      {normalizedItems.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className={joinClassNames("flex gap-3 text-foreground/80", itemClassName)}
        >
          {marker ? (
            <span className="shrink-0">
              {typeof marker === "function" ? marker(item, index) : marker}
            </span>
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

export function MdxCodeFrame({
  title,
  meta,
  code,
  variant = "default",
  size = "md",
}: MdxCodeFrameProps) {
  const isTerminal = variant === "terminal";
  const isTree = variant === "tree";
  const lines = normalizeCodeLines(code);
  const shouldHighlight = !isTree;
  const normalizedLanguage = normalizeCodeLanguage(meta, isTerminal);

  return (
    <figure
      className={joinClassNames(
        "not-prose my-6 overflow-hidden rounded-[1.35rem] border",
        isTerminal
          ? "border-border/80 bg-muted/35 text-foreground"
          : "border-border/80 bg-background",
      )}
    >
      <figcaption
        className={joinClassNames(
          "flex items-center justify-between border-b px-4 py-2.5 text-sm",
          isTerminal
            ? "border-border/70 bg-muted/35 text-muted-foreground"
            : "border-border/70 bg-muted/30 text-muted-foreground",
        )}
      >
        {isTerminal ? (
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400/85" />
            <span className="size-2.5 rounded-full bg-amber-300/85" />
            <span className="size-2.5 rounded-full bg-emerald-400/85" />
            <span className="ml-2">{title}</span>
          </span>
        ) : (
          <span className={isTree ? "font-medium" : "font-medium text-foreground"}>{title}</span>
        )}
        {meta ? (
          <span className="rounded-full bg-background px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </figcaption>
      <pre
        className={joinClassNames(
          "!m-0 overflow-x-auto !rounded-none !border-0 !bg-transparent !shadow-none",
          codeSizeClasses[size],
          isTerminal ? "" : "text-foreground",
          variant === "default" ? "!bg-muted/20" : "",
          isTree ? "text-foreground/85" : "",
        )}
      >
        <code>
          {lines.map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              {isTerminal ? <span className="select-none text-muted-foreground">$ </span> : null}
              {shouldHighlight ? highlightCodeLine(line, normalizedLanguage) : line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function MdxHighlight({
  title,
  icon,
  children,
  tone = "neutral",
  size = "md",
  variant = "soft",
}: MdxHighlightProps) {
  const isStrong = variant === "strong";
  const normalizedVariant: MdxVariant =
    variant === "strong" ? "soft" : variant === "minimal" ? "plain" : variant;

  return (
    <MdxCard
      tone={tone}
      size={isStrong ? "lg" : size}
      variant={normalizedVariant}
      className={joinClassNames(
        isStrong ? "bg-background" : "",
        variant === "minimal" ? "shadow-none" : "",
      )}
    >
      {title ? (
        <p
          className={joinClassNames(
            "flex items-center gap-2 font-medium",
            isStrong
              ? "text-xs uppercase tracking-[0.22em] text-muted-foreground"
              : "text-sm text-muted-foreground",
            variant === "soft" ? "items-start text-lg leading-8 tracking-[-0.01em] text-foreground" : "",
          )}
        >
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          <span>{title}</span>
        </p>
      ) : null}
      <div
        className={joinClassNames(
          title ? "mt-3" : "",
          isStrong
            ? "text-[1.2rem] font-medium leading-9 tracking-[-0.015em] text-foreground sm:text-[1.32rem] sm:leading-10"
            : "text-[1rem] leading-8 text-muted-foreground",
        )}
      >
        {children}
      </div>
    </MdxCard>
  );
}

export function MdxItemGrid({
  items,
  columns = 2,
  tone = "neutral",
  size = "md",
  variant = "plain",
  className,
}: MdxItemGridProps) {
  const normalizedColumns = normalizeColumns(columns);

  return (
    <div
      className={joinClassNames(
        "not-prose my-7 grid gap-3",
        columnsClasses[normalizedColumns],
        className,
      )}
    >
      {items.map(({ title, description }) => (
        <MdxCard
          key={`${title}-${description ?? ""}`}
          as="section"
          tone={tone}
          size={size}
          variant={variant}
          className="my-0"
        >
          <p className="font-medium text-foreground">{title}</p>
          {description ? (
            <p className="mt-2 text-[0.96rem] leading-7 text-muted-foreground">{description}</p>
          ) : null}
        </MdxCard>
      ))}
    </div>
  );
}

function normalizeColumns(columns: MdxColumns): "1" | "2" | "3" {
  const normalizedColumns = String(columns);

  if (normalizedColumns === "1" || normalizedColumns === "2" || normalizedColumns === "3") {
    return normalizedColumns;
  }

  return "2";
}

function normalizeCodeLanguage(language: string | undefined, isTerminal: boolean) {
  if (isTerminal) {
    return "shell";
  }

  const normalizedLanguage = language?.toLowerCase().trim();

  if (!normalizedLanguage) {
    return "text";
  }

  if (["tsx", "jsx", "ts", "js", "typescript", "javascript"].includes(normalizedLanguage)) {
    return "tsx";
  }

  if (["json", "jsonc"].includes(normalizedLanguage)) {
    return "json";
  }

  if (["sh", "shell", "bash", "zsh", "terminal"].includes(normalizedLanguage)) {
    return "shell";
  }

  return normalizedLanguage;
}

function highlightCodeLine(line: string, language: string) {
  if (!line) {
    return "\u00a0";
  }

  if (language === "shell") {
    return highlightByPattern(line, /(--?[\w-]+)|([^\s]+)/g, (_token, captures, index) => {
      const [option] = captures;

      if (option) {
        return "option";
      }

      return index === 0 || line.slice(0, index).trim().endsWith("&&") ? "command" : undefined;
    });
  }

  if (language === "json") {
    return highlightByPattern(
      line,
      /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(\btrue\b|\bfalse\b|\bnull\b)|(-?\b\d+(?:\.\d+)?\b)|([{}[\],:])/g,
      (_token, captures) => {
        const [key, string, literal, number, punctuation] = captures;

        if (key) {
          return "attr";
        }
        if (string) {
          return "string";
        }
        if (literal || number) {
          return "number";
        }
        if (punctuation) {
          return "punctuation";
        }
        return undefined;
      },
    );
  }

  return highlightByPattern(
    line,
    /(\/\/.*$|\/\*.*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.:-]*|\/?>)|(\b(?:import|export|default|from|function|return|const|let|var|type|interface|extends|async|await|if|else|new|null|undefined|true|false)\b)|(\b[A-Za-z_$][\w$]*(?=\s*\())|(\b\d+(?:\.\d+)?\b)|(\b(?:className|type|onClick|href|src|alt|title|code|language|size)\b)|([{}[\]().,;:=])/g,
    (_token, captures) => {
      const [comment, string, tag, keyword, fn, number, attr, punctuation] = captures;

      if (comment) {
        return "comment";
      }
      if (string) {
        return "string";
      }
      if (tag) {
        return "tag";
      }
      if (keyword) {
        return "keyword";
      }
      if (fn) {
        return "function";
      }
      if (number) {
        return "number";
      }
      if (attr) {
        return "attr";
      }
      if (punctuation) {
        return "punctuation";
      }
      return undefined;
    },
  );
}

function highlightByPattern(
  line: string,
  pattern: RegExp,
  resolveTokenType: (
    token: string,
    captures: Array<string | undefined>,
    index: number,
  ) => keyof typeof codeTokenClassNames | undefined,
) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(pattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(line.slice(lastIndex, index));
    }

    const tokenType = resolveTokenType(token, match.slice(1), index);

    nodes.push(
      tokenType ? (
        <span key={`${index}-${token}`} className={codeTokenClassNames[tokenType]}>
          {token}
        </span>
      ) : (
        token
      ),
    );

    lastIndex = index + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : line;
}

export function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}
