import {
  getMdxToneClassName,
  type MdxToneInput,
  type MdxVariant,
  joinClassNames,
} from "@/components/mdx/mdx-primitives";

type ImageFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  tone?: MdxToneInput;
  variant?: MdxVariant;
};

export function ImageFrame({
  src,
  alt,
  caption,
  tone = "neutral",
  variant = "plain",
}: ImageFrameProps) {
  return (
    <figure
      className={joinClassNames(
        "not-prose my-7 overflow-hidden rounded-[1.35rem] border",
        getMdxToneClassName(tone, variant),
      )}
    >
      {/* MDX posts can reference remote or local images without known dimensions. */}
      <div className="px-4 py-8 sm:px-6 sm:py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="mx-auto h-auto max-h-80 w-auto max-w-full object-contain sm:max-h-96"
          loading="lazy"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-border/70 bg-surface px-4 py-3 text-sm leading-6 text-foreground/72 dark:text-foreground/78">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
