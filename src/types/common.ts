export interface ResponseApi<T> {
    error?: string;
    data: T,
    status_code: number
}