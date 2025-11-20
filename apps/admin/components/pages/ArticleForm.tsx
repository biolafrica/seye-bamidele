"use  client";

import { ArticleFormData, BackendArticle, MainArticle } from "@/types/articles";
import Form from "../common/Form";
import { articleFields } from "@/data/articles";
import { useArticles } from "@/hooks/useApi";
import { handleMultipleImagesUpload } from "@/app/utils/common/imageUpload";

export default function ArticleForm({initialValues, edit, article , onSuccess }: {
  initialValues: ArticleFormData;
  edit: boolean;
  article: BackendArticle | null;
  onSuccess?: () => void;
}) {

  const {create,update} = useArticles();

  const validateArticle = (values: ArticleFormData, isEdit: boolean) => {
    const errors: Partial<Record<keyof ArticleFormData, string>> = {};
    
    if (values.title && values.title.length > 60) {
      errors.title = 'Title must be less than 60 characters';
    }

    if (values.excerpt && values.excerpt.length > 250) {
      errors.excerpt = 'Excerpt must be less than 250 characters';
    }

    if (!isEdit && !values.image) {
      errors.image = 'Image is required';
    }

    return errors;
  }

  const handleArticleSubmit = async (values: ArticleFormData) => {
    let formData: Partial<MainArticle> = {
      title: values.title,
      content: values.content,
      excerpt: values.excerpt,
    };

    try {
      if (values.image || values.image1 || values.image2) {
        const uploadedImageUrls = await handleMultipleImagesUpload(
          values.image, 
          values.image1, 
          values.image2
        );

        if (uploadedImageUrls.length > 0) {
          const paddedImages: [string, string, string] = [
            uploadedImageUrls[0] || '',
            uploadedImageUrls[1] || '',
            uploadedImageUrls[2] || ''
          ];
          
          formData.images = paddedImages;
          formData.image = uploadedImageUrls[0];
        }

      } else if (edit && article?.images) {
        formData.images = article.images;
        formData.image = article.image;
      }

      if (edit) {
        const id = article?.id || '';
        await update(id, formData);
      } else {
        await create(formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting articles form:", error);
    }
  };


  return (
    <div>
      <Form
        fields={articleFields}
        initialValues={initialValues}
        validate={(values) => validateArticle(values, edit)} 
        onSubmit={handleArticleSubmit}
        submitLabel={edit ? 'Update Article' : 'Create Article'}
      />
    </div>
  );
}