export const convertDate = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() + 9);
    const dateConverted = dateObj.toLocaleString("ja-JP");
    console.log(dateConverted);

    return dateConverted;
};
