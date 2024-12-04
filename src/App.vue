<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLoaderStore } from './stores/loader';
import { storeToRefs } from 'pinia';
const {loading} = storeToRefs(useLoaderStore())
</script>

<template>
  <div class="min-h-dvh relative">
    <RouterView v-if="!loading" />
    <div v-else class="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
      <div class="loader"></div>
    </div>
  </div>
</template>
