export interface DBArticle {
  id?: string;
  title: string;
  excerpt: string;
  content: string | null;
  image: string | null;
  images?: string[] | null; 
  status?: "published" | "draft" | "archived";
  created_at: string;
  updated_at?: string | null;
}

export interface BlogArticle {
  id?: string;
  title: string;
  content: string | null;
  image: string | null;
  images: {
    image_1: string;
    image_2: string; 
    image_3: string;
  } | null;
  created_at: string;
  excerpt: string;
  read?: number;
  author?: string;
}

export interface Article {
  date: string;
  title: string;
  excerpt: string;
  link: {
    text: string;
    url: string;
  };
}

export interface ArticleWithMetadata extends Article {
  id: string;
  image: string | null;
  read?: number;
  author?: string;
}


export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ArticlesResponse {
  data: DBArticle[];
  pagination: PaginationInfo;
}

export interface ArticleResponse {
  data: DBArticle | null;
  error?: string;
}


export type ArticleStatus = "published" | "draft" | "archived";

export interface ArticleQueryParams {
  page?: string;
  limit?: string;
  status?: ArticleStatus;
  search?: string;
}

export interface ArticleLink {
  text: string;
  url: string;
}

