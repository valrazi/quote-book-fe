import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
http.interceptors.request.use((config) => {
    const authStore = useAuthStore(); // Get the store instance
    const token = authStore.token; // Access the token directly

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle the error
    return Promise.reject(error);
});

export default http;
