export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTimeText: string;
};

export type PostDetail = PostSummary & {
  content: string;
};

export type RawFrontmatter = Partial<PostFrontmatter>;
