import * as MongoDB from "mongodb";
import { loadDotEnv, getEnv } from "../services/env_service";
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
            mongo.collection("words").createIndex({ _id: 1 });
            console.log("Connected to MongoDB.");
        })
        .catch((error) => {
            console.error(error);
        });
};
