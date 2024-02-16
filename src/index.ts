import express from "express";
import helmet from "helmet";
import cors from "cors";
import * as bodyParser from "body-parser";
import { loadDotEnv, getEnv } from "./services/env_service";
loadDotEnv();
import { registerRoutes } from "./routes";
const HTTP_BODY_LIMIT = "500mb";

const app = express();
app.use(bodyParser.json({ limit: HTTP_BODY_LIMIT }));
app.use(bodyParser.urlencoded({ limit: HTTP_BODY_LIMIT, extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());
registerRoutes(app);

function main() {
    const port = getEnv("APP_PORT") || "3000";
    app.listen(port, () => {
        console.log("Port:", port);
    });
}

main();
