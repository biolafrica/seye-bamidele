import Form, { FormField } from "../common/Form";

interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
}


export default function ArticleForm({initialValues, edit }: {
  initialValues: ArticleFormData;
  edit: boolean;
}) {
  const articleFields:FormField[] = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter article title', required: true },
    { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter article content', required: true },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Enter article excerpt', required: false },
  ]

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

  // Article form implementation goes here
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