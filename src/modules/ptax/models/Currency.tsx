 export default class Currency {
    symbol: string;
    formatedName: string;
    currencyType: string;
    
    //Api returns data formated in portuguese.
    // Workaround to code universal understading
    constructor(data: any) {
        this.symbol = data.simbolo;
        this.formatedName = data.nomeFormatado;
        this.currencyType = data.tipoMoeda;
    }
 }