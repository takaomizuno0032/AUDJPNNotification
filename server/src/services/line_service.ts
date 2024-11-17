import { getEnv, loadDotEnv } from "./env_service";
loadDotEnv();
import { getRate } from "./exchange_rate_service";
import axios from "axios";
import { convertDate } from "../utils/date_converter";
import { getEnglishWord, getExampleEnglishWords } from "./openai_service";
import { saveWordInfos } from "../models/mongo";

export const sendNotifiction = async () => {
    const THRESHOLD = 95;
    const ACCESS_TOKEN = getEnv("LINE_ACCESS_TOKEN");
    const LINE_GROUP_ID = getEnv("LINE_GROUP_ID");

    const rateInfo = await getRate("AUD", "JPY");
    const BrisbaneDate = convertDate(rateInfo.updateDate);

    const decision =
        rateInfo.rate < THRESHOLD ? "替え時かも！" : "うーん、まだまだかな。";

    const wordInfos = await getEnglishWord();
    const saveResult = await saveWordInfos(wordInfos);
    const wordsMessage = wordInfos
        .map(
            (wordInfo) =>
                `word: ${wordInfo.word}\ntranslation: ${wordInfo.translation}\n例文: ${wordInfo.sentenceExample}`
        )
        .join("\n\n");

    const options = {
        method: "POST",
        url: "https://api.line.me/v2/bot/message/push",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        data: {
            to: LINE_GROUP_ID,
            messages: [
                {
                    type: "text",
                    text: `今日のレートをお知らせします。${BrisbaneDate}現在の情報です。`,
                },
                {
                    type: "text",
                    text: `1AUD = ${rateInfo.rate} JPY`,
                },
                {
                    type: "text",
                    text: decision,
                },
                {
                    type: "text",
                    text: wordsMessage,
                },
            ],
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
