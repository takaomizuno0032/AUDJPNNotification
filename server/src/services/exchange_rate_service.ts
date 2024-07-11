import axios from "axios";
import { getEnv } from "./env_service";

const API_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = getEnv("API_KEY");

interface RateInfo {
    baseCurrency: string;
    quoteCurrency: string;
    updateDate: string;
    rate: number;
}

export const getRate = async (
    baseCurrency: string,
    quoteCurrency: string
): Promise<RateInfo> => {
    const url = `${API_URL}/${API_KEY}/latest/${baseCurrency}`;
    const options = {
        method: "GET",
        url: url,
    };

    try {
        const response = await axios.request(options);
        const data = response.data;

        const rateInfo: RateInfo = {
            baseCurrency: baseCurrency,
            quoteCurrency: quoteCurrency,
            updateDate: data.time_last_update_utc,
            rate: data.conversion_rates[quoteCurrency],
        };

        return rateInfo;
    } catch (error) {
        console.error(error);
        const rateInfo: RateInfo = {
            baseCurrency: baseCurrency,
            quoteCurrency: quoteCurrency,
            updateDate: "",
            rate: 0,
        };
        return rateInfo;
    }
};
