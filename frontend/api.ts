import axios from "axios";
import { WordInfo } from "./app/types/word_info";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/v1";

export const addWord = async (word: WordInfo): Promise<WordInfo> =>{
    try{
        const res = await axios.post(`${baseUrl}/englishword`,{
            word: word.word,
            phoneticSymbol:word.phoneticSymbol,
            translation: word.translation,
            sentenceExample: word.sentenceExample
        },{
            headers:{
                "Content-Type": "application/json"
            }
        });
        return res.data as WordInfo;
       }catch(error){
        if(axios.isAxiosError(error)){
            console.error("Axios Error:", error.response?.data || error.message);
        }else{
            console.error("Unknwn error:", error);
        }
        throw error;
       }
};

export const getAllWords = async (): Promise<{wordInfos: WordInfo[]}> => {
    try{
        const res = await axios.get(`${baseUrl}/allenglishwords`, { headers: {"Cache-Control" : "no-store"}});
        const wordInfos = res.data;
        return wordInfos;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error("Axios Error", error.response?.data || error.message);
        }else{
            console.error("Unknown error:", error);
        }
        throw error;
    }
}