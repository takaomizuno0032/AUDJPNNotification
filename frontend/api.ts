import { WordInfo } from "./app/types/word_info";

const baseUrl = "http://localhost:3000/v1"

export const addWord = async (word: WordInfo): Promise<WordInfo | undefined> =>{
    try{
        const res = await fetch(`${baseUrl}/englishword`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    word: word.word,
                    translation: word.translation,
                    sentenceExample: word.sentenceExample
                }
            ),
        });

        if(!res.ok){
            throw new Error(`Failed to add word: ${res.statusText}`);
        }
    
        const newWord: WordInfo = await res.json();
        return newWord;
    }catch(error){
        console.error("Error adding word:", error);
    }
};