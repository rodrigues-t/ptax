var Global = {
    RequestURLs: {
        currencies: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json',
        exchangeRateDay: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=\'@CURRENCY\'&@dataCotacao=\'@DATERATE\'&$top=100&$format=json'
    },
    CurrencyPriorities: new Map([["USD", 1], ["EUR", 2], ["GBP", 3], ["CAD", 4], ["AUD", 5],
    ["CHF", 6], ["JPY", 7], ["DKK", 8], ["NOK", 9], ["SEK", 10]])

};
Global.getCurrencyPriority = key => {
    let p = Global.CurrencyPriorities.get(key);
    return p !== undefined ? p : 100;
}
export default Global;
