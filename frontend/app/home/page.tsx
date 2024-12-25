import { getAllWords } from "@/api";
import AddWord from "../components/AddWord";
import WordsList from "../components/WordsList";


export default async function Home() {
    const resonse = await getAllWords();
    const wordInfos = resonse.wordInfos;
    console.log("Api word info", wordInfos);

    return (
      <main className="py-2 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-gray-700 -mt-32">
            You need to remember all of them.
            </h1>
            <div className="w-full max-w-3xl mt-5">
            <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg" style={{ maxHeight: "300px", overflowY: "auto"}}>
                <AddWord />
                <WordsList wordInfos={ wordInfos } />
            </div>
            </div>
        </div>
      </main>
    );
  }
