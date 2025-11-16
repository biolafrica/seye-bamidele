import PageHeader from "@/components/common/PageHeader";
import SettingsSider from "@/components/layout/settingsSider";
import ProfileForm from "@/components/pages/ProfileForm";


export default function SettingsPage() {   
  return (
    <main className="">
      <PageHeader
        heading="Settings"
        subHeading="Manage your account settings"
        showButton={false}
      />

      <div className="flex gap-5 px-4 sm:px-6 lg:px-8">

        <div className="min-w-[270px] w-full lg:w-1/4 ">
          <SettingsSider/>
        </div>

        <div className="w-3/4 hidden lg:block bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-heading mb-6">Profile Form</h2>
          <ProfileForm/>
        </div>

      </div>
    </main>
  )
}