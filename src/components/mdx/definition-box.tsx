import {
  MdxBlockTitle,
  MdxCard,
  type MdxSize,
  type MdxToneInput,
  type MdxVariant,
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
  return (
    <MdxCard tone={tone} size={size} variant={variant}>
      <MdxBlockTitle tone={tone} className="text-xs tracking-[0.18em]">
        {title}
      </MdxBlockTitle>
      <dl className="mt-3">
        <dt className="text-lg font-medium leading-8 tracking-[-0.01em] text-foreground">{term}</dt>
        <dd className="mt-2 text-[1rem] leading-8 text-muted-foreground">{description}</dd>
      </dl>
    </MdxCard>
  );
}
