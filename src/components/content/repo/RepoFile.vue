<script setup>
    import { defineProps, ref, onMounted, watch } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        defaultBranch : String,
        repoName : String,
    });

    const repoFile = ref([]);
    const groupRepoFile = ref([]);

    const fetch = async (repoName) => {
        try {
            const [getRepoFile] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}/contents`)
            ]);
            repoFile.value = getRepoFile.data;
            // group the repoFile Type
            groupRepoFile.value = groupFile(repoFile.value);

        } catch (error) {
            console.log(error);
        }
    }

    watch( () => props.repoName, (newrepoName) =>{
        if(newrepoName){
            fetch(props.repoName);
        }
    });

    const groupFile = (data) =>{
        const files = ref([]);
        const dir = ref([]);
        const groupedData = ref([]);
        data.forEach(element => {
            if(element.type == 'dir'){
                dir.value.push(element);
            }else{
                files.value.push(element);
            }
        });
        groupedData.value = [...dir.value, ...files.value];
        return groupedData.value;
    }

    onMounted(() => {
        fetch(props.repoName);
    })

</script>

<template>
    <div class="flex">
        <p class="font-MontserratBold">File Explorer</p>
        <p class="ml-auto md:mr-[100px]">Default Branch: <span class="font-MontserratBold -text--ge-gray2">{{ defaultBranch }}</span></p>
    </div>
    <div class="w-full h-[600px] overflow-auto">
        <div class="overflow-x-auto my-5">
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="files in groupRepoFile" class="hover">
                        <td><font-awesome-icon class="text-[1.5rem]" :icon="files.type == 'file' ? ['fas', 'file-lines'] : ['fas', 'folder-open']" /></td>
                        <td><a :href="files.type == 'file' ? files.download_url : files.html_url" class="hover:underline" target="_blank">{{ files.name }}</a></td>
                        <td>{{ files.type }}</td>
                        <td>{{ files.size }} kb</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
