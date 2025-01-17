import express from "express";
import helmet from "helmet";
import cors from "cors";
import * as bodyParser from "body-parser";
import { loadDotEnv, getEnv } from "./services/env_service";
loadDotEnv();
import { registeroutes } from "./apis/v1/routes";
import cron from "node-cron";
import { sendNotifiction } from "./services/line_service";
import { prepareMongo } from "./models/mongo";
const HTTP_BODY_LIMIT = "500mb";
const API_VERSION = "/v1";

const app = express();
app.use(bodyParser.json({ limit: HTTP_BODY_LIMIT }));
app.use(bodyParser.urlencoded({ limit: HTTP_BODY_LIMIT, extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(API_VERSION, registeroutes());

const task = cron.schedule(
    "0 20 * * *",
    () => {
        sendNotifiction();
    },
    {
        scheduled: true,
        timezone: "Australia/Brisbane",
    }
);

function main() {
    const port = getEnv("APP_PORT") || "3000";
    task.start();
    app.listen(port, () => {
        // TODO: @Issei MongoDBを使う段階まで開発が進んだらコメントアウトを外す
        prepareMongo();
        console.log("Port:", port);
    });
}

main();
