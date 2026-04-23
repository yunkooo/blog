import {
  MdxBlockTitle,
  getMdxToneTextClassName,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";

type DefinitionBoxProps = {
  term: string;
  description: string;
  title?: string;
  tone?: MdxToneInput;
  size?: MdxSize;
  variant?: MdxVariant;
};

export function DefinitionBox({
  term,
  description,
  title = "Definition",
  tone = "neutral",
  size = "md",
  variant = "plain",
}: DefinitionBoxProps) {
  void size;
  void variant;

  return (
    <aside className="not-prose my-7 rounded-r-xl border-l-2 border-border bg-surface/60 py-3 pl-5 pr-4">
      <MdxBlockTitle tone={tone} className="text-xs tracking-[0.18em]">
        {title}
      </MdxBlockTitle>
      <dl className="mt-3">
        <dt
          className={joinClassNames(
            "text-lg font-medium leading-8 tracking-[-0.01em]",
            getMdxToneTextClassName(tone),
          )}
        >
          {term}
        </dt>
        <dd className="mt-2 text-[1rem] leading-8 text-foreground/76 dark:text-foreground/80">
          {description}
        </dd>
      </dl>
    </aside>
  );
}
