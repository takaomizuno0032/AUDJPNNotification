import { Express } from "express";

export const registerRoutes = (app: Express) => {
    app.get("/api/test", (req, res) => {
        res.send("Hello AUDJPYNot server!");
    });
};
