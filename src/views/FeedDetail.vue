<script setup lang="ts">
import { apiQuotesOne } from '@/api/service/quote';
import IconAdd from '@/assets/icons/IconAdd.vue';
import FeedListItem from '@/components/FeedListItem.vue';
import type { QuoteComment, Quote } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useLoaderStore } from '@/stores/loader';
import { apiCommentAdd, apiCommentAll } from '@/api/service/quoteComment';
import { ElNotification } from 'element-plus';
import CommentListItem from '@/components/CommentListItem.vue';
const { setLoading, removeLoading } = useLoaderStore()
const { id } = useRoute().query
const quote = ref<Quote>()
const quoteComment = ref<QuoteComment[]>([])
const getData = async () => {
    try {
        const res = await apiQuotesOne(id?.toString()!)
        if (!res.data.error) {
            quote.value = res.data.data
            const resC = await apiCommentAll(res.data.data.id)
            quoteComment.value = resC.data.data
        }
    } catch (error) {
        console.log(error)
    }
}


const showInput = ref<boolean>(false)
const comment = ref<string>('')
const submit = async () => {
    try {
        setLoading()
        const res = await apiCommentAdd({ comment: comment.value, quoteId: quote.value?.id! })
        if (!res.data.error) {
            ElNotification({
                title: 'success',
                message: 'Success Add Comment',
                type: 'success'
            })
        } else {
            ElNotification({
                title: 'failed',
                message: 'Failed Add Comment',
                type: 'error'
            })
        }
    } catch (error) {
        console.log(error)
        ElNotification({
            title: 'failed',
            message: 'Failed Add Comment',
            type: 'error'
        })
    } finally {
        removeLoading()
        getData()
        showInput.value = false
        comment.value = ''
    }
}

onMounted(() => {
    getData()
})
</script>

<template>
    <FeedListItem :quote="quote" v-if="quote" />
    <div class="w-full flex justify-end items-end px-4 flex-col gap-2 my-2">
        <el-button type="info" size="small" style="width: 50%;" @click="showInput = !showInput">
            <IconAdd class="w-4 h-4" /> Add Comment
        </el-button>
        <div class="w-full flex flex-col items-end gap-2" v-if="showInput">
            <textarea v-model="comment" rows="5" class=" w-full border-2 border-gray-100 rounded-md"></textarea>
            <el-button @click="submit" color="#432E54" size="small" style="width: 50%;">
                Submit
            </el-button>
        </div>
    </div>
    <div class="w-full" v-if="quoteComment">
        <CommentListItem :comment="c" v-for="c in quoteComment"/>
    </div>
</template>