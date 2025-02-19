<template>
    <div v-if="repoData" class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[50px]">
        <div class="flex gap-x-[20px] items-center justify-center md:justify-start w-full md:w-8/12">
            <img class="w-[80px] rounded-full" :src="repoData.owner.avatar_url" alt="Github User Profile">
            <div class="flex flex-col text-base">
                <p class="font-MontserratBold text-[2rem] line-clamp-1">{{ repoData.name }}</p>
                <p class="">{{ repoData.owner.login }}</p>
            </div>
            <p class="border -border--ge-gray rounded-[50px] px-[10px] -text--ge-gray mx-5">{{ repoData.visibility }}</p>
        </div>
        <div class="flex ml-auto gap-x-[20px] w-full md:w-4/12 justify-center md:justify-start my-4">
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'⭐'+' starred this repo'">
                <font-awesome-icon :icon="['far', 'star']" />
                <p>Starred 0</p>
            </div>
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'🔁'+' forked this repo'">
                <font-awesome-icon :icon="['fas', 'code-fork']" />
                <p>Fork 0</p>
            </div>
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'👁️'+' watcher on this repo'">
                <font-awesome-icon :icon="['far', 'eye']" />
                <p>Watching 1</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted, watch } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        repoName: String,
    })

    const repoData = ref(null);

    const fetch = async (repoName) => {
        try {
            const [getRepoInfo] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}`),
            ]);
            repoData.value = getRepoInfo.data;
            console.log(repoData.value);
        } catch (error) {
            console.log(error);
        }
    }

    watch( () => props.repoName, (newrepoName) =>{
        if(newrepoName){
            fetch(props.repoName);
        }
    });

    onMounted(() => {
        fetch(props.repoName)
    })
</script>
