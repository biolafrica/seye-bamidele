import LoginForm from "@/components/pages/settings/UserForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex ">

      <div className="w-full lg:w-3/7 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          
          <div className="mb-10">
            <div className="h-10 w-10  rounded-full flex items-center justify-center">
              <img src="/seye-logo.svg" alt="seye-logo" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold">
            Sign in to your account
          </h1>

          <div className="mt-10">
            <LoginForm />
          </div>

        </div>
      </div>

      <div className="hidden lg:block w-5/7 relative">
        <img
          src="/seye-office.jpg"
          alt="Workspace"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
