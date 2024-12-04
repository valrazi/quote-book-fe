<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <div class="bg-gray-200">
        <div class="bg-white max-w-lg mx-auto min-h-dvh overflow-x-hidden">
            <Navbar />
            <RouterView />
        </div>
    </div>
</template>