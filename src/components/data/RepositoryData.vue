<template>
    <div class="flex items-center p-[10px_15px] rounded-[10px] gap-x-[10px] my-4 hover:outline hover:-outline--ge-sky-blue hover:cursor-pointer hover:-text--ge-sky-blue transition-[all_150ms_ease]" v-if="repoData" v-for="repo in repoData.splice(0, itemToShow)">
        <font-awesome-icon :icon="['fas', 'hashtag']" />
        <p class="overflow-hidden text-ellipsis">{{ repo.full_name }}</p>
        <font-awesome-icon class="ml-auto text-[1.5rem]" :icon="['fas', 'circle-arrow-right']" />
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        repoData: Array,
        itemToShow: Number
    });
</script>
