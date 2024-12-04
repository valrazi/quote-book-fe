<script setup lang="ts">
import type { Quote, QuoteComment } from '@/types';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import IconDelete from '@/assets/icons/IconDelete.vue';
import Swal from 'sweetalert2';
import { apiQuotesDelete } from '@/api/service/quote';
import { ElNotification } from 'element-plus';
import { useLoaderStore } from '@/stores/loader';
import IconComment from '@/assets/icons/IconComment.vue';
import { apiCommentDelete } from '@/api/service/quoteComment';
const { setLoading, removeLoading } = useLoaderStore()

const { user } = storeToRefs(useAuthStore())
const props = defineProps<{
    comment: QuoteComment
}>()
const emit = defineEmits(['fetchData'])
const nameSplit = props.comment.user.fullName.split(' ')
const fName = nameSplit[0][0]
const lName = nameSplit.length > 1 ? nameSplit[1][0] : ''

props.comment.createdAt = moment(props.comment.createdAt).format('DD MMM YYYY, HH:mm')

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
                    const res = await apiCommentDelete(props.comment.id)
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
                <h1 class="text-xs font-bold">{{ comment.user.fullName }}</h1>
                <p class="text-[10px]">{{ comment.createdAt }}</p>
                <h2 class="italic text-sm">"{{ comment.comment }}"</h2>
            </div>
            <button 
            @click="deleteQuote"
            class="px-2 py-1 rounded-lg border border-gray-100 h-fit" v-if="user.id == comment.userId">
                <IconDelete class="w-4 h-4 text-red-500" />
            </button>
        </div>
    </div>
</template>