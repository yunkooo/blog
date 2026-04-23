export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  summary?: string[];
  faq?: PostFaqItem[];
  relatedQuestions?: string[];
  featured?: boolean;
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTimeText: string;
  wordCount: number;
};

export type PostDetail = PostSummary & {
  content: string;
};

export type RawFrontmatter = Partial<PostFrontmatter>;

export type PostFaqItem = {
  question: string;
  answer: string;
};
