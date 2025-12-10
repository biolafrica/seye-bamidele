import PageHeader from "@/components/common/PageHeader";
import SettingsSider from "@/components/layout/settingsSider";
import ProfileForm from "@/components/pages/settings/ProfileForm";

export default function ProfilePage() {    
  return (
    <main className="">
      <PageHeader
        heading="Settings"
        subHeading="Manage your account settings"
        showButton={false}
      />

      <div className="flex gap-5 px-4 sm:px-6 lg:px-8">

        <div className="min-w-[270px] w-1/4 hidden lg:block">
          <SettingsSider/>
        </div>

        <div className="w-full lg:w-3/4 bg-card p-9 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-heading mb-6">Profile Form</h2>
          <ProfileForm/>
        </div>

      </div>
    </main>
  )
}