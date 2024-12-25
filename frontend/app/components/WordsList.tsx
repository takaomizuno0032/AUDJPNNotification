import { WordInfo } from "../types/word_info";

interface WordsProps {
    wordInfos: WordInfo[];  
}

export default function WordsList({ wordInfos }: WordsProps){
    console.log("word infos:", wordInfos);
    return (
    <ul className="space-y-3">
        {wordInfos.map((wordInfo, index) => (
            <li key={index} 
                className="p-4 bg-white border rounded shadow flex flex-col md:flex-col nd:items-center md:justify-between"
            >
                <div className="mb-2 md:mb-0">
                    <span className="block text-gray-800"> Word: {wordInfo.word}</span>
                </div>
                <div className="mb-2 md:mb-0">
                    <span className="block text-gray-800">Symbol: {wordInfo.phoneticSymbol}</span>
                </div>
                <div className="mb-2 md:mb-0">
                    <span className="block text-gray-800">Translation: {wordInfo.translation}</span>
                </div>
                <div>
                    <span className="block text-gray-800">Example: {wordInfo.sentenceExample}</span>
                </div>
            </li>
        ))
        }
    </ul>
  )
}