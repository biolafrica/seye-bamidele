export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your portfolio content</p>
        <div className="mt-8 space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Dashboard
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded">
            Settings
          </button>
        </div>
      </div>
    </main>
  );
}
