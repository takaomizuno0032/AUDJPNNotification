import { Router } from "express";
import { getRate } from "../../services/exchange_rate_service";
import { convertDate } from "../../utils/date_converter";
import { sendNotifiction } from "../../services/line_service";
import { getExampleEnglishWords } from "../../services/openai_service";
import { WordInfo } from "../../types/word_info";
import { saveWordInfo } from "../../models/mongo";

const VERSION = "v1";

export const registeroutes = (): Router => {
    const router = Router();
    router.use((req, res, next) => {
        next();
    });

    router.get("/test", (req, res) => {
        res.send("Hello AUDJPYNot server!");
    });

    router.get(`/rate`, async (req, res) => {
        let result = {
            baseCurrency: "",
            quoteCurrency: "",
            updateDate: "",
            rate: 0,
        };

        const baseCurrency = (req.query.base_currencty as string) ?? "AUD";
        const quoteCurrency = (req.query.quote_currency as string) ?? "JPY";
        try {
            const rateInfo = await getRate(baseCurrency, quoteCurrency);
            if (rateInfo !== undefined) {
                result = {
                    baseCurrency: baseCurrency,
                    quoteCurrency: quoteCurrency,
                    updateDate: rateInfo.updateDate,
                    rate: rateInfo.rate,
                };
            }

            res.send(JSON.stringify(result));
        } catch (error) {
            res.status(500).send;
        }
    });

    router.get("/notification", (req, res) => {
        sendNotifiction();
        res.send("Notification sent!");
    });

    router.get("/englishwords", async (req, res) => {
        let result: { wordInfos: WordInfo[] } = {
            wordInfos: [],
        };
        try {
            const wordInfos: WordInfo[] = await getExampleEnglishWords();
            if (wordInfos !== undefined) {
                result = {
                    wordInfos: wordInfos,
                };
            }

            res.send(JSON.stringify(result));
        } catch (error) {
            console.error("Error fetching data from OpenAI", error);
            res.status(500).send("Error fetching data from OpenAI");
        }
    });

    router.post("/englishword", async (req, res) => {
        const result = {
            messeage: "",
            objectId: undefined
        };

        const word: string = req.body.word ?? "";
        const translation: string = req.body.translation ?? "";
        const sentenceExample: string = req.body.sentenceExample ?? "";
        const wordInfo: WordInfo = {
            word: word,
            translation: translation,
            sentenceExample: sentenceExample
        };

        try{
            const objectId = await saveWordInfo(wordInfo);
            result.objectId = objectId;
            result.messeage = "Word saved successfully!";
            res.send(JSON.stringify(result));
        }catch(error){
            result.messeage = "Error saving word."
            res.status(500).send(JSON.stringify(result));
        }

    });

    return router;
};
