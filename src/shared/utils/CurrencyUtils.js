import { parse } from "date-fns";
import { getCurrencyByDate } from "brazil-currencies";

const currencyPriorities = new Map(
    [
        ["USD", 1], ["EUR", 2], ["GBP", 3], ["CAD", 4], ["AUD", 5],
        ["CHF", 6], ["JPY", 7], ["DKK", 8], ["NOK", 9], ["SEK", 10]
    ]
);

const getCurrencyPriority = key => {
    let p = currencyPriorities.get(key);
    return p !== undefined ? p : 100;
}

const getBrCurrencySymbol = date => getCurrencyByDate(parse(date, 'yyyy-MM-dd kk:mm:ss.SSS', new Date()))?.symbol;

export {
    currencyPriorities,
    getCurrencyPriority,
    getBrCurrencySymbol,
}