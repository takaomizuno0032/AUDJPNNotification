import OpenAI from "openai";
import { getEnv } from "./env_service";
import { WordInfo } from "../types/word_info";
import { getTimeRange } from "../utils/date_converter";
import { getWordInfosWithTimeRange } from "../models/mongo";

const openai = new OpenAI({
    apiKey: getEnv("OPENAI_API_KEY"),
});

export const getExampleEnglishWords = async (
    wordsLearned: WordInfo[]
): Promise<WordInfo[]> => {
    const NUM_OF_WORDS = 2;
    const NUM_OF_PHRASES = 1;

    let promptWordLearned = generatePromptWordLearned(wordsLearned);
    console.log("promptLearned:", promptWordLearned);

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                {
                    role: "system",
                    content: "You are an English native speaker.",
                },
                {
                    role: "user",
                    content: `Provide the number of ${NUM_OF_WORDS} IELTS 7.5 vocabulary words and ${NUM_OF_PHRASES} native phrases not commonly taught in school.
                     Include Japanese translations and example sentences for each. Format the response as a JSON object with two arrays:
                     'words' and 'phrases'. Each item should have 'word', 'phoneticSymbol', 'translation', and 'sentenceExample'.`,
                },
                {
                    role: "user",
                    content: `I have already learned the following words, so please do not include these words or phrases: ${promptWordLearned}`,
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

        const parsedResponse = JSON.parse(resultTexts);
        const wordInfos: WordInfo[] = [
            ...parsedResponse.words,
            ...parsedResponse.phrases,
        ];
        console.log("words from GPT:", wordInfos);

        return wordInfos;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw new Error("Failed to fetch data from OpenAI");
    }
};

export const getEnglishWord = async (): Promise<WordInfo[]> => {
    const ONE_WEEK_DAYS = 7;
    const timeRange = getTimeRange(ONE_WEEK_DAYS);
    console.log("timerange:", timeRange);
    const wordsLearned = await getWordInfosWithTimeRange(timeRange);
    const wordInfos: WordInfo[] = await getExampleEnglishWords(wordsLearned);
    return wordInfos;
};

const generatePromptWordLearned = (wordsLearned: WordInfo[]): String => {
    let promptWordLearned = "";
    for (let i = 0; i < wordsLearned.length; i++) {
        promptWordLearned += wordsLearned[i].word;
        if (i < wordsLearned.length - 1) {
            promptWordLearned += ", ";
        } else {
            promptWordLearned += ".";
        }
    }
    return promptWordLearned;
};
