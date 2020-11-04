// Project standard Model
export default interface Rate {
    buy: Number;
    sell: Number;
    date: Date;
    buyParity: Number;
    sellParity: Number;
    bulletin: string;

    
}

// Model as received by API (in portuguese)
export interface Cotacao {
    cotacaoCompra: Number,
    cotacaoVenda: Number,
    dataHoraCotacao: Date,
    paridadeCompra: Number,
    paridadeVenda: Number,
    tipoBoletim: string,
}

// Transforms raw data in portuguese to standard Model in english
export function parseDataToRate(data: Cotacao): Rate {
    return {
        buy: data.cotacaoCompra,
        sell: data.cotacaoVenda,
        date: data.dataHoraCotacao,
        buyParity: data.paridadeCompra,
        sellParity: data.paridadeVenda,
        bulletin: data.tipoBoletim,
    }
}