import { Router } from "express";
import { getRate } from "../../services/exchange_rate_service";
import { convertDate } from "../../utils/date_converter";
import { sendNotifiction } from "../../services/line_service";

const VERSION = "v1";

export const registeroutes = (): Router => {
    const router = Router();
    router.use((req, res, next) => {
        next();
    });

    router.get("/test", (req, res) => {
        res.send("Hello AUDJPYNot server!");
    });

    // router.get(`/rate`, async (req, res) => {
    //     let result = {
    //         baseCurrency: "",
    //         quoteCurrency: "",
    //         updateDate: "",
    //         rate: 0,
    //     };

    //     const baseCurrency = (req.query.base_currencty as string) ?? "AUD";
    //     const quoteCurrency = (req.query.quote_currency as string) ?? "JPY";
    //     try {
    //         const rateInfo = await getRate(baseCurrency, quoteCurrency);
    //         if (rateInfo !== undefined) {
    //             result = {
    //                 baseCurrency: baseCurrency,
    //                 quoteCurrency: quoteCurrency,
    //                 updateDate: rateInfo.updateDate,
    //                 rate: rateInfo.rate,
    //             };
    //         }

    //         res.send(JSON.stringify(result));
    //     } catch (error) {
    //         res.status(500).send;
    //     }
    // });

    // router.get("/notification", (req, res) => {
    //     sendNotifiction();
    //     res.send("Notification sent!");
    // });

    return router;
};
