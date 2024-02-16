import { Router } from "express";
import { getRate } from "../../services/exchange_rate";

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
            base_currency: "",
            quote_currency: "",
            rate: 0,
        };

        const baseCurrency = req.query.base_currencty.toString();
        const quoteCurrency = req.query.quote_currency.toString();
        try {
            const rate = await getRate(baseCurrency, quoteCurrency);
            if (rate !== undefined) {
                result = {
                    base_currency: baseCurrency,
                    quote_currency: quoteCurrency,
                    rate: rate,
                };
            }

            res.send(JSON.stringify(result));
        } catch (error) {
            res.status(500).send;
        }
    });

    return router;
};
