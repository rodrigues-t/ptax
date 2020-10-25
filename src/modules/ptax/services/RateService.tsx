import { Api } from "../../../shared/services/Api";
import Rate from "../models/Rate";

export default class RateService extends Api {
    public async getRatePerDay(params: object): Promise<Rate[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.get(
                    '/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)',
                    {
                        ...params,
                        $top: 100,
                        $format: 'json'
                    });
                resolve(response.data.value.map((rate:any) => new Rate(rate)));
            } catch(e) {
                reject(e);
            }
        });
    }
}