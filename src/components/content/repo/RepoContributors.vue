<script setup>
    import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        repoName: Object
    });
</script>

<template>
    <p>Contributors</p>
    {{ repoName }}
</template>
