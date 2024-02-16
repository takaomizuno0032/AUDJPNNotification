import dotenv from "dotenv";
import fs from "fs";

export type EnvItem = {
    DEBUG: boolean;
    APP_PORT: number;
    API_KEY: string;
    LINE_ACCESS_TOKEN: string;
    LINE_GROUP_ID: string;
};

export type EnvKey = keyof EnvItem;

export const loadDotEnv = (): void => {
    dotenv.config();
};

export const getEnv = <K extends EnvKey>(key: K): EnvItem[K] => {
    const value = process.env[key];

    if (/^\d+$/.test(value)) {
        return parseInt(value) as EnvItem[K];
    }

    return value as EnvItem[K];
};

export const reloadDotEnv = (): void => {
    const newEnv = dotenv.parse(fs.readFileSync(".env"));
    for (const key in newEnv) {
        process.env[key] = newEnv[key];
    }
    loadDotEnv();
};
