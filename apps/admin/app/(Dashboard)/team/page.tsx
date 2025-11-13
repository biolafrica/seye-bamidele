"use client"

import PageHeader from "@/components/common/PageHeader";

export default function TeamPage() {   
  const handleAddMember = () => {
    console.log("Adding team member...");
  }; 
  return (
    <PageHeader
      heading="Team"
      subHeading="Manage your team members"
      buttonText="Add Member"
      onButtonClick={handleAddMember}
    />
  )
}