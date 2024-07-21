"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { addWord } from "../../api";
import { useRouter } from "next/navigation";

export default function Addword() {
  const router = useRouter();

  const [wordInfo, setWordInfo] = useState({
    word: "",
    translation: "",
    sentenceExample: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWordInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addWord(
        {
          word: wordInfo.word,
          translation: wordInfo.translation,
          sentenceExample: wordInfo.sentenceExample
        }
      );
      setWordInfo({ word: "", translation: "", sentenceExample: "" });
      router.refresh();
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            name="word"
            value={wordInfo.word}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="Word"
          />
          <label className="block mt-1 text-sm text-gray-600">TERM</label>
        </div>
        <div className="flex-1">
          <input
            name="translation"
            value={wordInfo.translation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="訳"
          />
          <label className="block mt-1 text-sm text-gray-600">日本語訳</label>
        </div>
        <div className="flex-5">
          <input
            name="sentenceExample"
            value={wordInfo.sentenceExample}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="Example Sentence"
          />
          <label className="block mt-1 text-sm text-gray-600">EXAMPLE</label>
        </div>
        <div className="flex-3">
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95">
          Add Word
           </button>
        </div>
      </div>
    </form>
  );
}