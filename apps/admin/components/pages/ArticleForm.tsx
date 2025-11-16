import { ArticleFormData } from "@/types/articles";
import Form from "../common/Form";
import { articleFields } from "@/data/articles";



export default function ArticleForm({initialValues, edit }: {
  initialValues: ArticleFormData;
  edit: boolean;
}) {
 
  const validateArticle = (values: ArticleFormData ) => {
    const errors: Partial<Record<keyof ArticleFormData, string>> = {};
    
    if (values.title && values.title.length > 150) {
      errors.title = 'Title must be less than 150 characters';
    }

    if (values.excerpt && values.excerpt.length > 300) {
      errors.excerpt = 'Excerpt must be less than 300 characters';
    }

    return errors;
  }

  const handleArticleSubmit = async (values: ArticleFormData) => {
    edit ? console.log('Article updated:', values) : console.log('Article created:', values);
  };


  return (
    <div>
      <Form
        fields={articleFields}
        initialValues={initialValues}
        validate={validateArticle}
        onSubmit={handleArticleSubmit}
        submitLabel={edit ? 'Update Article' : 'Create Article'}
      />
    </div>
  );
}