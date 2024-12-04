<template>
    <AddQuote  :show="formQuotes" @fetch-data="getData" />
    <div class="w-full flex justify-end p-4">
        <button 
            @click="formQuotes = true"
            class="px-2 py-1 text-xs text-white rounded-lg bg-primary flex gap-x-2 items-center">
            <IconAdd class="w-4 h-4"/>
            <span>Add Quote</span>
        </button>
    </div>
    <div class="w-full">
        <FeedListItem :quote="q" v-for="q in quoteList"
        @fetchData="getData"
        @click="$router.push('/feed-detail?id=' + q.id)"/>
    </div>
</template>

<script setup lang="ts">
import { apiQuotesAll } from '@/api/service/quote';
import IconAdd from '@/assets/icons/IconAdd.vue';
import FeedListItem from '@/components/FeedListItem.vue';
import AddQuote from '@/components/modals/AddQuote.vue';
import type { Quote } from '@/types';
import { onMounted, ref } from 'vue';
const formQuotes = ref<boolean>(false)
const quoteList = ref<Quote[]>()
const getData = async () => {
    formQuotes.value = false
    try {
        const res = await apiQuotesAll()
        if(!res.data.error) {
            quoteList.value = res.data.data
        }
    } catch (error) {
        
    }
}
onMounted(() => {
    getData()
})
</script>
