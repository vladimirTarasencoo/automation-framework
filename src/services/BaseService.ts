import axios, {AxiosInstance,AxiosRequestConfig,AxiosResponse,AxiosError} from "axios";

export class BaseService {
    protected api: AxiosInstance;
    private token: string | null = null;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.api.interceptors.request.use( //регистрация "перехватчика" запроса (до его отправки)
            (config) => { // Обработка перед отправкой запроса
                console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
                if (this.token) {
                    config.headers['Authorization'] = `Bearer ${this.token}`;
                }
                return config;
            },
            (error) => { // Обработка ошибки при формировании запроса
                console.error("[REQUEST ERROR]", error);
                return Promise.reject(error);
            }
        );
        this.api.interceptors.response.use( //перехватчик ответа — срабатывает при любом ответе от сервера, успешном или с ошибкой
            (response) => { // Обработка успешного ответа
                console.log(`[RESPONSE] ${response.status} ${response.config.url}`);
                return response;
            },
            (error: AxiosError) => { // Обработка ошибки ответа (например, 400, 500)
                if (error.response) {
                    console.error(`[RESPONSE ERROR] ${error.response.status}: ${JSON.stringify(error.response.data)}`);
                } else if (error.request) {
                    console.error("[NO RESPONSE]", error.request);
                } else {
                    console.error("[AXIOS ERROR]", error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    public setToken(token: string) {
        this.token = token;
        console.log('[TOKEN SET]', token);
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    protected async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url, config);
    }

    protected async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, data, config);
    }

    protected async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, data, config);
    }

    protected async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(url, config);
    }
}
