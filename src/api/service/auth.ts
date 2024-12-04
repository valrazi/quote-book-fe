import type {  UserRegisterPayload,  ResponseApi, User } from "@/types";
import http from "../client";

export const apiAuthRegister = async (payload: UserRegisterPayload) => {
    return await http.post<ResponseApi<User>>('/register', payload)
}

export const apiAuthLogin = async(payload: {email: string; password:string}) => {
    return await http.post<ResponseApi<{token: string, user: User}>>('/login', payload)
}