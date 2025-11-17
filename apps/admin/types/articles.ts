
export interface Article {
  id?: number;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
  image1?: string;
  image2?: string;
  created_at?: string;
  content?: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  image: File | null;
  image1: File | null;
  image2: File | null;

}