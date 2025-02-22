<script setup>
    import { defineProps, ref, onMounted, watch } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        defaultBranch : String,
        repoName : String,
    });

    const repoFile = ref([]);

    const fetch = async (repoName) => {
        try {
            const [getRepoFile] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}/contents`)
            ]);
            repoFile.value = getRepoFile.data;
            console.log(getRepoFile.data);

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
        fetch(props.repoName);
    })

</script>

<template>
    <div class="flex">
        <p class="">File Explorer</p>
        <p class="ml-auto md:mr-[100px]">Default Branch: <span class="font-MontserratBold -text--ge-gray2">{{ defaultBranch }}</span></p>
    </div>
    <div class="w-full">
        <p v-for="files in repoFile">{{ files.name }}</p>
    </div>
</template>
