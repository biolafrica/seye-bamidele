import PageHeader from "@/components/common/PageHeader";
import SettingsSider from "@/components/layout/settingsSider";
import ChangePasswordPage from "@/components/pages/changePassword";

export default function PasswordPage() {    
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

        <div className="w-full lg:w-3/4">
         <div className="border">
            <ChangePasswordPage/>
         </div>
        </div>

      </div>
    </main>
  )
}