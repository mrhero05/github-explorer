<script setup>
    import { defineProps, ref, onMounted, watch } from 'vue';
    import axios from 'axios';
    import { marked } from 'marked';

    const readMe = ref('');
    const readMeData = ref([]);

    const props = defineProps({
        repoName : String,
    });

    const fetch = async (repoName) => {
        try {
            const [getReadme] = await Promise.all([
                axios.get(`https://api.github.com/repos/${repoName}/readme`),
            ]);
            readMeData.value = getReadme.data;
            readMe.value = marked(atob(getReadme.data.content));
            console.log(readMeData.value);

        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        fetch(props.repoName);
    })

</script>

<template>
    <div class="py-[50px]">
        <div class="border rounded -border--ge-gray2">
            <div class="rounded flex items-center gap-x-[20px] border-b p-[20px]">
                <font-awesome-icon class="text-[2rem]"
                :icon="['fas', 'book-open']" />
                <a :href="readMeData.html_url" target="_blank" class="font-MontserratBold hover:underline">README</a>
            </div>
            <div v-if="readMe" v-html="readMe"
            class="p-[20px]"
            ></div>
        </div>
    </div>
</template>
