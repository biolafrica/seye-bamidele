"use  client";

import { ArticleFormData, BackendArticle, MainArticle } from "@/types/articles";
import { articleFields } from "@/data/articles";
import { handleMultipleImagesUpload } from "@/app/utils/common/imageUpload";
import { useState } from "react";
import { useArticles } from "../../../../../packages/ui/src/hooks/useApi";
import { Alert, Form } from "@seye-bamidele/ui";

export default function ArticleForm({initialValues, edit, article , onSuccess }: {
  initialValues: ArticleFormData;
  edit: boolean;
  article: BackendArticle | null;
  onSuccess?: (action: "created" | "updated") => void;
}) {
  const [errorMsg,  setErrorMsg]   = useState("");

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
    console.log("Submitting article with values:", values);
    
    let formData: Partial<MainArticle> = {
      title: values.title,
      content: values.content,
      excerpt: values.excerpt,
    };

    try {
      const hasNewImages = 
        (values.image instanceof File) || 
        (values.image1 instanceof File) || 
        (values.image2 instanceof File);

      if (hasNewImages) {
        const uploadedImageUrls = await handleMultipleImagesUpload(
          values.image instanceof File ? values.image : null, 
          values.image1 instanceof File ? values.image1 : null, 
          values.image2 instanceof File ? values.image2 : null
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
      const action = edit ? "updated" : "created";
      onSuccess?.(action);

    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error submitting, please try again.");
      console.error("Error submitting articles form:", error);
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

      <div>
        <Form
          fields={articleFields}
          initialValues={initialValues}
          validate={(values) => validateArticle(values, edit)} 
          onSubmit={handleArticleSubmit}
          submitLabel={edit ? 'Update Article' : 'Create Article'}
        />
      </div>

    </>
  );
}