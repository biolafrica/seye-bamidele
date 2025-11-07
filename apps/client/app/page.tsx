export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Client App</h1>
        <p className="text-lg text-gray-600">Welcome to Seye Bamidele's Website</p>
        <div className="mt-8 space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}