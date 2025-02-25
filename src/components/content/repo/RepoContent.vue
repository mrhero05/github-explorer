<script setup>
    import { defineProps, ref, onMounted, watch } from 'vue';
    import RepoFile from '@/components/content/repo/RepoFile.vue';
    import RepoAbout from '@/components/content/repo/RepoAbout.vue';
    import axios from 'axios';
    import RepoRelease from '@/components/content/repo/RepoRelease.vue';
    import JsonColors from '@/assets/colors.json'

    const props = defineProps({
        repoName: String,
    })

    const repoData = ref(null);
    const repoLanguanges = ref(null);
    const repoDefBranch = ref('');
    const repoAbout = ref('');
    const repoStarCount = ref('');
    const repoForkCount = ref('');
    const repoWatcherCount = ref('');

    const fetch = async (repoName) => {
        try {
            // fetch all repo data
            const [getRepoInfo] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}`),
            ]);
            const [getRepoLanguages] = await Promise.all([
                axios.get(getRepoInfo.data.languages_url)
            ]);

            // Set data per variables
            repoData.value = getRepoInfo.data;
            repoLanguanges.value = getRepoLanguages.data;
            repoDefBranch.value = repoData.value.default_branch;
            repoAbout.value = repoData.value.description;
            repoStarCount.value = repoData.value.stargazers_count;
            repoForkCount.value = repoData.value.forks_count;
            repoWatcherCount.value = repoData.value.watchers_count;
            languageColors(JsonColors, repoLanguanges.value);

        } catch (error) {
            console.log(error);
        }
    }

    const languageColors = (JsonColors, languages) =>{
        const langKeys = Object.keys(languages);

        const getColors = langKeys.map((element) => JsonColors[element]);
        console.log(getColors);
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

<template>
    <div v-if="repoData" class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[50px]">
        <div class="flex flex-wrap gap-x-[20px] items-center justify-center md:justify-start w-full md:w-8/12">
            <img class="w-[80px] rounded-full" :src="repoData.owner.avatar_url" alt="Github User Profile">
            <div class="flex flex-col">
                <p class="font-MontserratBold text-[2rem] line-clamp-1">{{ repoData.name }}</p>
                <p class="">{{ repoData.owner.login }}</p>
            </div>
            <p class="border -border--ge-gray rounded-[50px] px-[10px] -text--ge-gray mx-5">{{ repoData.visibility }}</p>
        </div>
        <div class="flex ml-auto gap-x-[20px] w-full md:w-4/12 justify-center md:justify-start my-4">
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'⭐ '+ repoStarCount +' starred this repo'">
                <font-awesome-icon :icon="['far', 'star']" />
                <p>Starred {{ repoStarCount }}</p>
            </div>
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'🔁 '+ repoForkCount +' forked this repo'">
                <font-awesome-icon :icon="['fas', 'code-fork']" />
                <p>Fork {{ repoForkCount }}</p>
            </div>
            <div class="tooltip hover:cursor-pointer mx-2 flex items-center gap-x-[5px]" :data-tip="'👁️ '+ repoWatcherCount +' watcher on this repo'">
                <font-awesome-icon :icon="['far', 'eye']" />
                <p>Watching {{ repoWatcherCount }}</p>
            </div>
        </div>
        <section class="flex flex-row flex-wrap gap-[10px] my-4">
            <p class="-bg--ge-white-gray p-[1px_20px] rounded-[15px]"
            v-for="(lang, langIndex) in repoLanguanges" :key="langIndex"
            >
                {{ langIndex }}
            </p>
        </section>
        <section class="flex w-full my-4 flex-wrap gap-x-[40px]">
            <div class="w-full md:w-[calc(66.6%-20px)]">
                <RepoFile :default-branch="repoDefBranch" :repo-name="repoName" />
            </div>
            <div class="w-full md:w-[calc(33.3%-20px)] my-5 md:my-0">
                <RepoAbout :repo-about="repoAbout" />
                <RepoRelease :repo-name="repoName" />
            </div>
        </section>
    </div>
</template>
