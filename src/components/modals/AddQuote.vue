<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import type { QuoteAdd } from '@/types';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoaderStore } from '@/stores/loader';
import { apiQuotesAdd } from '@/api/service/quote';
import { ElNotification } from 'element-plus';
const { setLoading, removeLoading } = useLoaderStore()
const emit = defineEmits(['fetch-data'])
const props = defineProps<{
  show: boolean
}>()
const visible = ref<boolean>(false)
const payload = ref<QuoteAdd>({
  category: '',
  content: ''
})
const rules = {
  category: { required },
  content: { required }
}
const v$ = useVuelidate(rules, payload.value)
const resetForm = () => {
  payload.value.category = ''
  payload.value.content = ''
  emit('fetch-data')
}

const submit = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    try {
      setLoading()
      const res = await apiQuotesAdd(payload.value)
      if (!res.data.error) {
        ElNotification({
          title: 'success',
          message: 'Success Add Quote',
          type: 'success'
        })
        emit('fetch-data')
      } else {
        ElNotification({
          title: 'failed',
          message: 'Failed Add Quote',
          type: 'error'
        })
      }
    } catch (error) {
      console.log(error)
      ElNotification({
        title: 'failed',
        message: 'Failed Add Quote',
        type: 'error'
      })
    } finally {
      removeLoading()
    }
  }
}
watch(() => props.show, () => {
  visible.value = props.show
})
</script>
<template>
  <div>
    <el-dialog v-model="visible" title="Quote"  :before-close="resetForm">
      <div class="flex flex-col w-full px-2 my-2">
        <label for="" class="text-xs">Category</label>
        <select v-model="payload.category" class="px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
          <option value="" selected disabled>Quote Category</option>
          <option value="life">Life</option>
          <option value="work">Work</option>
          <option value="sport">Sport</option>
          <option value="comedy">Comedy</option>
        </select>
        <div class="input-errors" v-for="error of v$.category.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="flex flex-col w-full px-2">
        <label for="" class="text-xs">Content</label>
        <textarea v-model="payload.content" rows="5"
          class="px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg"></textarea>
        <div class="input-errors" v-for="error of v$.content.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="resetForm">Cancel</el-button>
          <el-button type="primary" style="background-color: #432E54;border: 0;" @click="submit">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>