<template>
    <button v-if="data && itemToShow < data.length" class="btn h-[2.5rem] min-h-[2.5rem] m-auto flex my-4" @click="$emit('loadMore')">
        <font-awesome-icon :icon="['fas', 'caret-down']" />
    Load More
    </button>
</template>
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        data: Array,
        itemToShow: Number
    });
</script>
