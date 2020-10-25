 export default class Currency {
    symbol: string;
    formatedName: string;
    currencyType: string;
    
    // API returns data formatted in portuguese.
    // Workaround to the universal understanding of code
    constructor(data: any) {
        this.symbol = data.simbolo;
        this.formatedName = data.nomeFormatado;
        this.currencyType = data.tipoMoeda;
    }
 }