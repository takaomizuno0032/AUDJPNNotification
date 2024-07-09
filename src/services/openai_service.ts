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
                { role: "system", content: "You are an English native speaker." },
                {
                    role: "user",
                    content:
                        "Provide six IELTS 7.5 words and four native phrases not taught in school. Include Japanese translations and example sentences in a JSON array with 'word', 'translation', and 'sentenceExample'.",
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
            response_format: { type: "json_object" },
        });

        const resultTexts = completion.choices[0].message?.content.trim();
        
        if (!resultTexts) {
          throw new Error("No content returned from OpenAI API");
        }

        const wordInfos: WordInfo[] = JSON.parse(resultTexts).words;
        console.log(wordInfos);
        return wordInfos;

    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to fetch data from OpenAI");
    }
};
