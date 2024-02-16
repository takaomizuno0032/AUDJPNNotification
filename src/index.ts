import express from "express";
import helmet from "helmet";
import cors from "cors";
import * as bodyParser from "body-parser";
import { loadDotEnv, getEnv } from "./services/env_service";
loadDotEnv();
import { registeroutes } from "./apis/v1/routes";
import cron from "node-cron";
import { sendNotifiction } from "./services/line_service";
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
    "0 9 * * *",
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
        console.log("Port:", port);
    });
}

main();
