import ArticleClient from "@/components/pages/article/articleClient";
import {createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Articles",
  description: "Create and manage your articles",
});

export default function ArticlesPage() {
  return (<ArticleClient/>);
}