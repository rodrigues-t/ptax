// Project standard Model
export default interface Currency {
  symbol: string;
  formatedName: string;
  currencyType: string;
}

// Model as received by API (in portuguese)
export interface Moeda {
  simbolo: string;
  nomeFormatado: string;
  tipoMoeda: string;
}

// Transforms raw data in portuguese to standard Model in english
export function parseDataToCurrency(data: Moeda): Currency {
  return {
    symbol: data.simbolo,
    formatedName: data.nomeFormatado,
    currencyType: data.tipoMoeda,
  };
}
