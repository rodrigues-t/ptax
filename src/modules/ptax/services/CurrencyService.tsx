import { Api } from '../../../shared/services/Api';

export default class CurrencyService extends Api {
  public async getCurrencies(): Promise<any> {
    return this.get(
      '/Moedas',
      {
        $top: 100,
        $format: 'json',
      },
    );
  }
}
