import axios from 'axios';
import { apiConfig } from '../../config/ApiUrls';

export abstract class Api {
  protected baseUrl: string = apiConfig.baseUrl;

  protected async get(route: string, params?: any, headers?: any): Promise<any> {
    return axios.get(`${this.baseUrl}${route}`, {
      /* eslint-disable-next-line */
      params: params ? params : null,
      /* eslint-disable-next-line */
      headers: headers ? headers : null,
    });
  }
}
