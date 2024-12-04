import type { User } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>()
    const user = ref<User | null>()

    function login(payload: {token: string; user: User}){
        token.value = payload.token
        user.value = payload.user
    }

    function logout(){
        token.value = null
        user.value = null
    }
    return {token, user, login, logout};
}, {persist: true})