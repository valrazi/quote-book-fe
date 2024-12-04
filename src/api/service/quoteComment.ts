import type { QuoteComment, QuoteCommentPayload, ResponseApi } from "@/types";
import http from "../client";


export const apiCommentAll = async (id:string) => {
    return await http.get<ResponseApi<QuoteComment[]>>('/comment?quoteId=' + id)
}
export const apiCommentAdd = async (payload: QuoteCommentPayload) => {
    return await http.post<ResponseApi<QuoteComment>>('/comment', payload)
}

export const apiCommentUpdate = async (comment: string, id: string) => {
    return await http.put<ResponseApi<QuoteComment>>('/comment/' + id, {comment})
}

export const apiCommentDelete = async (id: string) => {
    return await http.delete<ResponseApi<any>>('/comment/' + id)
}