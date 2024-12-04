<script setup lang="ts">
import IconLogo from '@/assets/icons/IconLogo.vue'
import InputEl from '@/components/atomics/InputElement.vue';
import IconPasswordVisible from '@/assets/icons/IconPasswordVisible.vue';
import IconPasswordInvisible from '@/assets/icons/IconPasswordInvisible.vue';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { UserRegisterPayload } from '@/types';
import { apiAuthRegister } from '@/api/service/auth';
import { ElNotification } from 'element-plus';
import { useLoaderStore } from '@/stores/loader';
const passwordVisible = ref<boolean>(false)
const payload = ref<UserRegisterPayload>({
    email: '',
    fullName: '',
    password: ''
})
const rules = {
    email: { required, email },
    fullName: { required },
    password: { required }
}
const v$ = useVuelidate(rules, payload.value)

const {setLoading, removeLoading} = useLoaderStore()
const submit = async () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
        try {
            setLoading()
            const res = await apiAuthRegister(payload.value)
            if (!res.data.error) {
                ElNotification({
                    title: 'success',
                    message: 'Register Success',
                    type: 'success'
                })
            } else {
                ElNotification({
                    title: 'error',
                    message: 'Register Failed:' + res.data.error,
                    type: 'error'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                title: 'error',
                message: 'Register Failed:',
                type: 'error'
            })
        } finally {
            removeLoading()
        }
    }
}
</script>
<template>
    <div class="bg-gray-200">
        <div class="bg-white max-w-md mx-auto  min-h-dvh flex flex-col justify-center items-center gap-2">
        <div class="flex gap-x-2 text-primary text-xs">
            <IconLogo class="w-4 h-4" />
            <h1 class="font-bold">QuoteBook</h1>
        </div>
        <div class="px-4">
            <h1 class="text-base text-center">Signup</h1>
            <h2 class="text-xs">Create an account</h2>
        </div>
        <div class="flex flex-col w-full px-4">
            <label for="" class="text-xs">Full Name</label>
            <InputEl type="text" v-model="payload.fullName" />
            <div class="input-errors" v-for="error of v$.fullName.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="flex flex-col w-full px-4">
            <label for="" class="text-xs">Email</label>
            <InputEl type="email" v-model="payload.email" />
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="flex flex-col w-full px-4 relative">
            <label for="" class="text-xs">Password</label>
            <InputEl :type="passwordVisible ? 'text' : 'password'" v-model="payload.password" />
            <div class="absolute top-6 right-7" @click="passwordVisible = !passwordVisible">
                <IconPasswordVisible class="w-4 h-4" v-if="!passwordVisible" />
                <IconPasswordInvisible class="w-4 h-4" v-else />
            </div>
            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="w-full px-4 flex justify-end">
            <button @click="$router.push({name: 'login'})" class="text-xs underline">Signin</button>
        </div>
        <div class="w-full px-4 flex justify-center items-center">
            <button class="w-1/2 p-2 bg-primary text-white rounded-lg text-xs" @click="submit">Signup</button>
        </div>
    </div>
    </div>
</template>