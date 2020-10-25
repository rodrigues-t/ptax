export default class Rate {
    buy: Number;
    sell: Number;
    date: Date;
    buyParity: Number;
    sellParity: Number;
    bulletin: string;

    // API returns data formatted in portuguese.
    // Workaround to the universal understanding of code
    constructor(data: any) {
        this.buy = data.cotacaoCompra;
        this.sell = data.cotacaoVenda;
        this.date = data.dataHoraCotacao;
        this.buyParity = data.paridadeCompra;
        this.sellParity = data.paridadeVenda;
        this.bulletin = data.tipoBoletim;
    }
}