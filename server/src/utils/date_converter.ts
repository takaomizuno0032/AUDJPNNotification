import { TimeRange } from "../types/time_range";

export const convertDate = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() + 9);
    const dateConverted = dateObj.toLocaleString("ja-JP");
    console.log(dateConverted);

    return dateConverted;
};

export const getTimeRange = (date: number) => {
    const now = new Date();
    const pastDate = new Date(now);

    pastDate.setDate(now.getDate() - date);

    const resultTimeRange: TimeRange = {
        past: pastDate,
        now: now,
    };

    return resultTimeRange;
};
