<template>
    <router-link :to="{
    name: 'UserContent',
    params: { username: user.login },
    query: {
        avatar: user.avatar_url,
        github_url: user.html_url,
    }
    }" class="flex items-center p-[10px_15px] rounded-[10px] gap-x-[10px] my-4 hover:outline hover:-outline--ge-sky-blue hover:cursor-pointer hover:-text--ge-sky-blue transition-[all_150ms_ease]" v-if="userData" v-for="user in userData.slice(0, itemToShow)" @click="closeModal">
        <font-awesome-icon class="" :icon="['fas', 'hashtag']" />
        <img :src="user.avatar_url" class="w-[50px] h-auto" alt="github_avatar">
        <p class="">{{ user.login }}</p>
        <font-awesome-icon class="ml-auto text-[1.5rem]" :icon="['fas', 'circle-arrow-right']" />
    </router-link>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        userData: Array,
        itemToShow: Number
    });

    const closeModal = () => {
        const modal = document.getElementById('searchModal');
        modal.close();
    }

</script>
