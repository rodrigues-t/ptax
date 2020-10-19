import { isAfter, parse } from "date-fns";

const getBrCurrencySymbol = date => {
    return isAfter(
                parse(date, 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), parse('30/06/1994 23:59:59.999', 'dd/MM/yyyy kk:mm:ss.SSS', new Date())
            ) ?
            'R$' : 
            '';
}

export {
    getBrCurrencySymbol
}