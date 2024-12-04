import type { User } from "./user"

export interface Quote {
    id: string
    content: string
    category: string
    userId: string
    updatedAt: string
    createdAt: string;
    user: User
    quoteCommentCount: number
}
export interface QuoteAdd {
    content: string;
    category: string
}

export interface QuoteCommentPayload {
    comment: string;
    quoteId: string;
}

export interface QuoteComment {
    id: string
    comment: string
    userId: string
    quoteId: string
    updatedAt: string
    createdAt: string
    user: User;
}