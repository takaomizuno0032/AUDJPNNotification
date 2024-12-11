import axios from "axios";
import { WordInfo } from "./app/types/word_info";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addWord = async (word: WordInfo): Promise<WordInfo | undefined> =>{
    try{
        const res = await axios.post(`${baseUrl}/englishwords`,{
            word: word.word,
            translation: word.translation,
            sentenceExample: word.sentenceExample
        },{
            headers:{
                "Content-Type": "application/json"
            }
        });

        return res.data;
       }catch(error){
        console.error("Error adding word:", error);
        throw error;
       }
};