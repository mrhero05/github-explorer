<script setup>
    import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        repoName: String,
        repoLanguagesColor: Object,
        repoLanguagesData: Object,
    });

    let repoLanguageFinalData = ref([]);

    const getLanguageData = (repoLanguagesColor, repoLanguagesData, repoName) =>{
        let langTotal = 0;
        for (let langName in repoLanguagesData) {
            langTotal += repoLanguagesData[langName];
        }

        repoLanguageFinalData.value = repoLanguagesColor.map(lang =>{
            const langName = Object.keys(lang)[0];
            const langColor = Object.values(lang)[0];
            const langPercentage = getLanguagePercentage(repoLanguagesData[langName], langTotal);

            return {
                language : langName,
                percentage : langPercentage,
                color : langColor,
            }
        });

        console.log(repoLanguageFinalData.value);
    }

    const getLanguagePercentage = (value, total) =>{
        return (value / total) * 100;
    }

    watch(() => props.repoLanguagesColor,
     (newRepoLangColor) =>{
        if(newRepoLangColor){
            getLanguageData(newRepoLangColor, props.repoLanguagesData, props.repoName);
        }
    });

    onMounted(() => {
        getLanguageData(props.repoLanguagesColor, props.repoLanguagesData, props.repoName);
    });

</script>

<template>
    <div class="flex h-4 w-full -bg--ge-light-gray rounded-full overflow-hidden">
        <div class="h-full"
        v-if="repoLanguageFinalData"
        :style="{
            backgroundColor: repoData.color,
            width: `${repoData.percentage}%`
        }"
        v-for="repoData in repoLanguageFinalData" :key="repoData.language"></div>
    </div>
    <div class="flex">
        <div v-for="repoData in repoLanguageFinalData" :key="repoData.language">
            <p>{{ repoData.language }}</p>
            <p>{{ repoData.percentage }}</p>
        </div>
    </div>
</template>
