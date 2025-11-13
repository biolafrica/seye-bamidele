"use client"

import PageHeader from "@/components/common/PageHeader";


export default function ArticlesPage() {    
  const handleAddArticle = () => {
    console.log("Creating article...");
  };

  return (
    <PageHeader
      heading="Articles"
      subHeading="Create and manage your articles"
      buttonText="Add Article"
      onButtonClick={handleAddArticle}
    />
  )
}