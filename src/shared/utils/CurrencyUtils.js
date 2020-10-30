import { isAfter, parse } from "date-fns";

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

const getBrCurrencySymbol = date => {
    return isAfter(
        parse(date, 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), parse('30/06/1994 23:59:59.999', 'dd/MM/yyyy kk:mm:ss.SSS', new Date())
    ) ?
        'R$' :
        '';
}

export {
    currencyPriorities,
    getCurrencyPriority,
    getBrCurrencySymbol,
}