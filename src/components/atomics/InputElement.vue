<template>
    <input :value="modelValue" @input="onInput"
        class="px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg">
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>