import type { ResponseApi, QuoteAdd, Quote } from "@/types";
import http from "../client";

export const apiQuotesAdd = async (payload: QuoteAdd) => {
    return await http.post<ResponseApi<Quote>>('/quotes', payload)
}

export const apiQuotesAll = async () => {
    return await http.get<ResponseApi<Quote[]>>('/quotes')
}

export const apiQuotesOne = async (id:string) => {
    return await http.get<ResponseApi<Quote>>('/quotes/' + id)
}

export const apiQuotesUpdate = async (id:string, content: string) => {
    return await http.put<ResponseApi<Quote>>('/quotes/' + id, {content})
}

export const apiQuotesDelete = async (id:string) => {
    return await http.delete<ResponseApi<any>>('/quotes/' + id)
}