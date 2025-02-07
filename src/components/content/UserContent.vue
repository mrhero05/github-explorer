<template>
    <p>user content{{ user }}</p>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        user: Object
    });
</script>
