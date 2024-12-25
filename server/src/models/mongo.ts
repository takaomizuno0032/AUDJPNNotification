import * as MongoDB from "mongodb";
import { loadDotEnv, getEnv } from "../services/env_service";
import { WordInfo } from "../types/word_info";
import { TimeRange } from "../types/time_range";
loadDotEnv();

const MONGO_HOST = getEnv("MONGO_HOST");
const MONGO_USER = getEnv("MONGO_USER");
const MONGO_PASS = getEnv("MONGO_PASS");

const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/admin`;
const dbName = getEnv("MONGO_NAME");

const client = MongoDB.MongoClient;
let mongo: MongoDB.Db;

export const prepareMongo = async () => {
    return client
        .connect(url)
        .then((client) => {
            mongo = client.db(dbName);
            mongo.collection("wordInfos").createIndex({ word: 1 });
            console.log("Connected to MongoDB.");
        })
        .catch((error) => {
            console.error(error);
        });
};

export const saveWordInfo = async (wordInfo: WordInfo): Promise<string> => {
    try {
        const now = new Date();
        const result = await mongo.collection("wordInfos").insertOne({
            word: wordInfo.word,
            translation: wordInfo.translation,
            sentenceExample: wordInfo.sentenceExample,
            createdAt: now,
            updatedAt: now,
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error(error);
    }
};

export const saveWordInfos = async (wordInfos: WordInfo[]): Promise<string> => {
    try {
        const now = new Date();
        const wordInfosWIthTimestamp = wordInfos.map((wordInfo) => ({
            ...wordInfo,
            createdAt: now,
            updatedAt: now,
        }));
        const result = await mongo
            .collection("wordInfos")
            .insertMany(wordInfosWIthTimestamp);
        return result.insertedIds.toString();
    } catch (error) {
        console.error(error);
    }
};

export const getWordInfosWithTimeRange = async (
    timeRange: TimeRange
): Promise<WordInfo[]> => {
    try {
        const result = await mongo
            .collection("wordInfos")
            .find({
                createdAt: {
                    $gte: timeRange.past,
                    $lte: timeRange.now,
                },
            })
            .toArray();
        const wordInfos = result as unknown as WordInfo[];
        console.log("saved:", wordInfos);
        return wordInfos;
    } catch (error) {
        console.log(error);
    }
};

export const getAllSavedWords = async (): Promise<WordInfo[]> => {
    try{
        const result = await mongo
         .collection("wordInfos")
         .find({})
         .sort({createdAt: -1})
         .toArray();
        const wordInfos = result as unknown as WordInfo[];
        return wordInfos;
    }
    catch(error){
        console.error("Error fetching all words", error);
        throw error;
    }
}