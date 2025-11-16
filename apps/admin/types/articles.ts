
export interface Article {
  id: number;
  date: string;
  title: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  image: File | null;
  image1: File | null;
  image2: File | null;

}