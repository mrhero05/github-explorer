<script setup>
    import { defineProps, ref, watch, onMounted } from 'vue';
    import axios from 'axios';
    import moment from 'moment';

    const props = defineProps({
        repoName: String
    });

    const repoReleases = ref([]);
    const repoReleaseDate = ref('');

    const fetch = async (repoName) => {
        try {
            // get releases repo
            const [getReleases] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}/releases`),
            ]);
            repoReleases.value = getReleases.data;
            repoReleaseDate.value = formatDate(repoReleases.value);
            // console.log(repoReleases.value);
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (repoReleases) =>{
        if (repoReleases[0]) {
            return moment(repoReleases[0].published_at).format('MMMM D, YYYY');
        }
    }

    watch(() => props.repoName, (newrepoName) =>{
        if(newrepoName){
            fetch(props.repoName);
        }
    });

    onMounted(() => {
        fetch(props.repoName);
    })
</script>

<template>
    <p class="font-MontserratBold">Releases</p>

    <div v-if="!repoReleases.length == 0" class="-text--ge-gray2 flex flex-wrap gap-x-[10px] items-center">
        <font-awesome-icon :icon="['fas', 'tag']" class="-text--ge-light-green text-[1.2rem]" />
        <a :href="repoReleases[0].html_url" target="_blank"
        class="hover:underline">{{ repoReleases[0].name }}</a>
        <span class="border -border--ge-light-green rounded-badge p-[2px_8px] text-[0.8rem] -text--ge-light-green">Latest</span>
        <p class="w-full text-[0.8rem]">on {{ repoReleaseDate }}</p>
    </div>
    <p v-else class="-text--ge-gray2">No releases published</p>

    <hr class="-border--ge-gray2 my-5 px-5">
</template>
