import axios, {AxiosInstance} from 'axios';

class HttpClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `${process.env.REACT_APP_API_HOST}/api`
        });
    }

    async get<TRes>(path: string, params: object = {}): Promise<TRes> {
        const response = await this.client.get<TRes>(path, {params});
        return response.data;
    }

    async post<TReq, TRes>(path: string, payload: TReq): Promise<TRes> {
        const response = await this.client.post<TRes>(path, payload);
        return response.data;
    }

    async patch<TReq, TRes>(path: string, payload: TReq): Promise<TRes> {
        const response = await this.client.patch<TRes>(path, payload);
        return response.data;
    }

    async delete<TRes>(path: string): Promise<TRes> {
        const response = await this.client.delete<TRes>(path);
        return response.data;
    }
}

export default new HttpClient();