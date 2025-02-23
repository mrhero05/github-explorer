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
            console.log(repoFile.value);
            groupRepoFile = groupFile(getRepoFile.data);

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
        data.forEach(element => {
            if(element.type == 'dir'){
                dir.value.push(element);
            }else{
                files.value.push(element);
            }
        });
        groupRepoFile.value = [...dir.value, ...files.value];
        return groupRepoFile.value;
    }

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
        <div class="overflow-x-auto">
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
                    <tr v-for="files in groupRepoFile">
                        <td><font-awesome-icon class="text-[1.5rem]" :icon="files.type == 'file' ? ['fas', 'file-lines'] : ['fas', 'folder-open']" /></td>
                        <td>{{ files.name }}</td>
                        <td>{{ files.type }}</td>
                        <td>{{ files.size }} kb</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
