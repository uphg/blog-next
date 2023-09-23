export type Post = {
  id: string;
  title: string;
  date: string | number | null;
  mdContent: string;
  toc?: PostToc,
  description?: string;
  tags?: string[];
  about?: boolean;
  cover?: string;
  prev?: PostMeta;
  next?: PostMeta;
}

export type PostToc = {
  content: string;
  slug: string;
  level: number;
  index: number;
}[]

export type PostMeta = {
  id: string;
  title: string;
  date: string | number | null;
}