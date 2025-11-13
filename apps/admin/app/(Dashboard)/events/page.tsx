"use client"

import PageHeader from "@/components/common/PageHeader";

export default function EventsPage() {  
  const handleCreateEvent = () => {
    console.log("Creating event...");
  };  
  return(
    <PageHeader
      heading="Events"
      subHeading="Manage and track your events"
      buttonText="Create Event"
      onButtonClick={handleCreateEvent}
    />
  )
}
