import axios from "axios";
import {apiConfig} from "../../config/ApiUrls"

export abstract class Api {
    protected baseUrl: string = apiConfig.baseUrl;

    protected async get(route: string, params?: any, headers?: any): Promise<any> {
        return await axios({
            method: 'get',
            url: `${this.baseUrl}${route}`,
            params: params ? params : null,
            headers: headers ? headers: null,
        });
    }
}