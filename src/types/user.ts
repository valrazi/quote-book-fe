export interface UserRegisterPayload {
    email:string;
    fullName:string;
    password:string;
}

export interface User {
    id: string
    email: string
    fullName: string
    roleId: number
    updatedAt: string
    createdAt: string
}