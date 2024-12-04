import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
    const addQuote = ref<boolean>(false)
    const updateQuote = ref<boolean>(false)
    return {addQuote, updateQuote}
})