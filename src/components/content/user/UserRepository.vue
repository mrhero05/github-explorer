<template>
    <div class="flex flex-col border -border--ge-gray shadow-[1px_1px_2px_1px_rgba(0,0,0,0.25)] p-[20px] rounded-[10px] w-full md:w-[calc(50%-10px)]" v-for="repo in userRepository.data.slice(0, repoItemToShow)" v-if="!userRepository.length == 0">
        <div class="flex items-center gap-x-[10px]">
            <font-awesome-icon :icon="['fas', 'book-bookmark']" />
            <a :href="repo.html_url" target="_blank" class="-text--ge-light-blue text-[1.2rem] font-MontserratBold text-ellipsis overflow-hidden whitespace-nowrap hover:underline">{{ repo.name }}</a>
            <p class="ml-auto border -border--ge-gray rounded-[50px] px-[10px] -text--ge-gray">Public</p>
        </div>
        <p class="line-clamp-3 my-3">{{ repo.description }}</p>
        <div class="flex items-center mt-auto">
            <p v-if="repo.language" class="flex mt-auto gap-x-[5px] items-center before:content-[''] before:w-[15px] before:h-[15px] before:-bg--ge-pink before:block before:rounded-box text-[0.8rem]">{{ repo.language }}</p>
            <div class="ml-auto flex items-center">
                <div class="mx-2 flex items-center gap-x-[5px]">
                    <div class="tooltip" :data-tip="'⭐'+repo.stargazers_count +' starred this repo'">
                        <font-awesome-icon :icon="['far', 'star']" />
                    </div>
                    <p>{{ repo.stargazers_count }}</p>
                </div>
                <div class="mx-2 flex items-center gap-x-[5px]">
                    <font-awesome-icon :icon="['fas', 'code-fork']" /><p>{{ repo.forks_count }}</p>
                </div>
                <div class="mx-2 flex items-center gap-x-[5px]">
                    <font-awesome-icon :icon="['far', 'eye']" /><p>{{ repo.watchers_count }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        No Repository Available
    </div>
    <LoadMoreBtn :data="userRepository.data" :item-to-show="repoItemToShow" @loadMore="repoLoadMore" />
</template>

<script setup>
    import axios from 'axios';
    import LoadMoreBtn from '@/components/data/LoadMoreBtn.vue';
    import { defineProps, watch, ref, onMounted, onBeforeUpdate } from 'vue';

    const props = defineProps({
        username: String
    });

    const userRepository = ref([]);
    const repoItemToShow = ref(4);

    const fetch = async (username) => {
        try {
            // fetch the selected user repositories
            const [getUserRepository] = await Promise.all([
                axios.get(`https://api.github.com/users/${username}/repos`),

            ]);

            userRepository.value = getUserRepository;
            // console.log(userRepository.value);
        } catch (error) {
            console.log(error);
        }
    }
    watch( () => props.username, (newUsername) => {
        if(newUsername){
            fetch(newUsername);
        }
    });

    const repoLoadMore = () => {
        repoItemToShow.value += 4;
    }

    onMounted(() => {
        fetch(props.username);
    })

</script>
