"use client"

import PageHeader from "@/components/common/PageHeader";

export default function SubscribersPage() {   
  const handleCreateNewsletter = () => {
    console.log("Creating newsletter...");
  }; 
  return(
    <PageHeader
      heading="Subscribers"
      subHeading="Manage your newsletter subscribers"
      buttonText="Create Newsletter"
      onButtonClick={handleCreateNewsletter}
    />
  )
}