import OpenAI from "openai";
import { getEnv } from "./env_service";
import { WordInfo } from "../types/word_info";

const openai = new OpenAI({
    apiKey: getEnv("OPENAI_API_KEY"),
});

export const getExampleEnglishWords = async (): Promise<WordInfo[]> => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content:
                        "List 10 English words with Japanese translations and example sentences. Format as a JSON array with 'word', 'translation', and 'sentenceExample'.",
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
            response_format: { type: "json_object" },
        });

        const resultTexts = completion.choices[0].message?.content.trim();
        console.log("resultTexts:", resultTexts);

        const dummyInfo = {
            word: "apple",
            translation: "りんご",
            sentenceExample: "I like apple.",
        };

        return [dummyInfo];

        // let wordInfos: WordInfo[] = [];
        //   if (!resultText) {
        //       throw new Error("No content returned from OpenAI API");
        //   }

        //   wordInfos.push(wordInfo);
        // }

        //   return wordInfos;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to fetch data from OpenAI");
    }
};
