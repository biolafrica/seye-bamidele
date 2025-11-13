import PageHeader from "@/components/common/PageHeader";

export default function SettingsPage() {    
  return (
    <main className="">
      <PageHeader
        heading="Settings"
        subHeading="Manage your account settings"
        showButton={false}
      />
    </main>
  )
}