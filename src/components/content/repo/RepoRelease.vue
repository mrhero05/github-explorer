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
            console.log(formatDate(repoReleases.value));
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (repoReleases) =>{
        return moment(repoReleases[0].published_at).format('MMMM D, YYYY');
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
    <p>Releases <span v-if="!repoReleases.length == 0" class="rounded-badge -bg--ge-gray2 px-2 -text--ge-white">{{ repoReleases.length }}</span></p>

    <p v-if="!repoReleases.length == 0" class="-text--ge-gray2 flex flex-wrap gap-x-[10px] items-center">
        <font-awesome-icon :icon="['fas', 'tag']" class="-text--ge-light-green text-[1.2rem]" />
        {{ repoReleases[0].name }}{{ repoReleases.length - 1 }}
        <span class="border -border--ge-light-green rounded-badge p-[2px_8px] text-[0.8rem] -text--ge-light-green">Latest</span>
        <span>on {{ repoReleaseDate }}</span>
    </p>
    <p v-else class="-text--ge-gray2">No releases published</p>

    <hr class="-border--ge-gray2 my-5 px-5">
</template>
