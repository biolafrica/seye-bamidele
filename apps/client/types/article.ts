export type DBArticle = {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  content: string | null;
  image: string | null;
  images: {
    image_1: string;
    image_2: string;
    image_3: string;
  } | null;
};

export type Article = {
  date: string;
  title: string;
  excerpt: string;
  link: { text: string; url: string };
  images?: {
    image_1: string;
    image_2: string;
    image_3: string;
  };
};