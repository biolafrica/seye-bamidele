export interface ArticleBase {
  id: string;
  created_at: string;
  updated_at: string | null;
  title: string;
  content: string;
  excerpt: string;
  image: string | null;
  images: string[] | null;
  status: string | null;
}


export type ArticleData = Omit<ArticleBase, 'updated_at' | 'status'>;
export type ArticleSidePanel = Omit<ArticleBase, 'updated_at' | 'created_at' | 'status'>;

export type ArticleFormData = Omit<ArticleBase, 'id' | 'created_at' | 'updated_at' | 'images' | 'status'> & {
  image: File | string | null;
  image1: File | string | null;
  image2: File | string | null;
};
export type ArticleTransformedFormData = Omit<ArticleBase, 'id' | 'created_at' | 'updated_at' | 'status' >
export type ArticleTableData = Pick<ArticleBase, 'created_at' | 'title' >; 
export type ArticlesTranformClientData = Pick<ArticleBase, 'title' | 'excerpt'> & {
  link:{
    text: string;
    url: string
  };
  date:string
}

export type ArticleTransformClientData = Omit<ArticleBase, 'updated_at' | 'status' | 'images'> & {
  images :{
    image_1 : string | "";
    image_2 : string | "";
    image_3 :string | "" ;
  } | null
}