import Login from "./components/Login";
  

export default function Home() {
  return (
    <main className="py-2 bg-gray-200">
      <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-700">
          Welcome to English Words App
          </h1>
          <div className="w-full max-w-3xl mt-5">
          <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
              <Login />
          </div>
          </div>
      </div>
    </main>
  );
}
