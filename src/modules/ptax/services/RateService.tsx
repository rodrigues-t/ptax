import format from 'date-fns/format';
import { Api } from '../../../shared/services/Api';
import Rate, { Cotacao, parseDataToRate } from '../models/Rate';

export default class RateService extends Api {
  public async getRatePerDay(currency: string, date: Date): Promise<Rate[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.get(
          '/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)',
          {
            '@moeda': `'${currency}'`,
            '@dataCotacao': `'${format(date, 'MM-dd-yyyy')}'`,
            $top: 100,
            $format: 'json',
          },
        );
        resolve(response.data.value.map((rate: Cotacao) => parseDataToRate(rate)));
      } catch (e) {
        reject(e);
      }
    });
  }
}
