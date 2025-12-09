
export interface Article {
  id?: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  image1: string;
  image2: string;
  created_at: string;
  content: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  image: any;
  image1: any;
  image2: any;
}

export interface BackendArticle {
  id: string;
  created_at: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  images: [string, string, string];
  updated_at: string;
}

export interface MainArticle {
  content: string;
  excerpt: string;
  title: string;
  image: string;
  images: string[];

}