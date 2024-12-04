<script setup lang="ts">
import IconDoor from '@/assets/icons/IconDoor.vue';
import IconLogo from '@/assets/icons/IconLogo.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2';
const authStore = useAuthStore()
const logout = () => {
    Swal.fire({
        title:'Signout',
        text:`Do you want to Signout?`,
        icon: 'question',
        showCancelButton: true
    })
    .then((res) => {
        if(res.isConfirmed) {
            authStore.logout()
            router.push({name: 'login'})
        }
    })
}
</script>

<template>
    <div class="w-full p-3 flex justify-between items-center border-b-2 border-gray-100 shadow-sm">
        <div class="flex gap-x-1 text-primary" @click="router.push({name:'feed'})">
            <IconLogo class="w-4 h-4"/>
            <h1 class="font-bold">QuoteBook</h1>
        </div>
        <button @click="logout">
            <IconDoor class="w-4 h-4 text-black"/>
        </button>
    </div> 
</template>