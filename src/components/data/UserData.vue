<template>
    <div class="flex items-center p-[10px_15px] rounded-[10px] gap-x-[10px] my-4 hover:outline hover:-outline--ge-gray hover:cursor-pointer" v-if="data" v-for="user in data.slice(0, itemToShow)">
        <font-awesome-icon :icon="['fas', 'hashtag']" />
        <img :src="user.avatar_url" class="w-[50px] h-auto" alt="github_avatar">
        <p class="">{{ user.login }}</p>
        <font-awesome-icon class="ml-auto text-[1.5rem]" :icon="['fas', 'circle-arrow-right']" />
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        data: Array,
        itemToShow: Number
    });
</script>
