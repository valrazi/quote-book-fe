import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore('loader', () => {
    const loading = ref<number>(0)
    function setLoading() {
        loading.value++
    }
    function removeLoading() {
        loading.value--
    }
    return {loading, setLoading, removeLoading}
})