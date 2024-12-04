<script setup lang="ts">
import type { Quote } from '@/types';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import IconDelete from '@/assets/icons/IconDelete.vue';
import Swal from 'sweetalert2';
import { apiQuotesDelete } from '@/api/service/quote';
import { ElNotification } from 'element-plus';
import { useLoaderStore } from '@/stores/loader';
import IconComment from '@/assets/icons/IconComment.vue';
const { setLoading, removeLoading } = useLoaderStore()

const { user } = storeToRefs(useAuthStore())
const props = defineProps<{
    quote: Quote
}>()
const emit = defineEmits(['fetchData'])
const nameSplit = props.quote.user.fullName.split(' ')
const fName = nameSplit[0][0]
const lName = nameSplit.length > 1 ? nameSplit[1][0] : ''

props.quote.createdAt = moment(props.quote.createdAt).format('DD MMM YYYY, HH:mm')
props.quote.category = props.quote.category[0].toUpperCase() + props.quote.category.slice(1)

const deleteQuote = () => {
    Swal.fire({
        showCancelButton: true,
        text: `This action can't be undone`,
        title: 'Delete',
        icon: 'warning'
    })
        .then(async (res) => {
            if (res.isConfirmed) {
                try {
                    setLoading()
                    const res = await apiQuotesDelete(props.quote.id)
                    if (!res.data.error) {
                        ElNotification({
                            title: 'success',
                            message: 'Success Delete Quote',
                            type: 'success'
                        })
                    } else {
                        ElNotification({
                            title: 'failed',
                            message: 'Failed Delete Quote',
                            type: 'error'
                        })
                    }
                } catch (error) {
                    ElNotification({
                        title: 'failed',
                        message: 'Failed Delete Quote',
                        type: 'error'
                    })
                } finally {
                    removeLoading()
                    emit('fetchData')
                }
            }
        })
}
</script>
<template>
    <div class="w-full p-4 border-b-[0.5px] border-gray-100 last:border-none flex flex-col gap-2">
        <div class="w-full flex gap-2 text-sm">
            <div class="w-[40px] h-[30px] flex justify-center items-center bg-primary text-white rounded-full">
                {{ fName + lName }}
            </div>
            <div class="w-full">
                <h1 class="text-xs font-bold">{{ quote.user.fullName }}</h1>
                <p class="text-[10px]">{{ quote.createdAt }} - {{ quote.category }}</p>
                <h2 class="italic text-sm">"{{ quote.content }}"</h2>
            </div>
            <button 
            @click="deleteQuote"
            class="px-2 py-1 rounded-lg border border-gray-100 h-fit" v-if="user.id == quote.userId">
                <IconDelete class="w-4 h-4 text-red-500" />
            </button>
        </div>
        <div class="w-full flex gap-x-2 items-center text-xs">
            <IconComment class="w-4 h-4"/>
            <p>{{ quote.quoteCommentCount }}</p>
        </div>
    </div>
</template>