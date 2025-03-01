<script setup>
    import { defineProps, ref, watch, onMounted } from 'vue';

    const props = defineProps({
        repoName: String,
        repoLanguagesColor: Object,
        repoLanguagesData: Object,
    });

    let repoLanguageFinalData = ref([]);
    let repoTotalPercentage = ref();

    const getLanguageData = (repoLanguagesColor, repoLanguagesData) =>{
        repoLanguageFinalData.value = repoLanguagesColor.map(lang =>{
            const langName = Object.keys(lang)[0];
            const langColor = Object.values(lang)[0];
            const langPercentage = getLanguagePercentage(repoLanguagesData[langName]);
            return {
                language : langName,
                percentage : langPercentage,
                color : langColor,
            }
        });
        console.log(repoLanguageFinalData);

    }

    const getLanguagePercentage = (value) =>{
        return value;
    }

    watch(() => props.repoName, (newRepoName) =>{
        if(newRepoName){
            getLanguageData(props.repoLanguagesColor, props.repoLanguagesData);
        }
    });

    onMounted(() => {
        getLanguageData(props.repoLanguagesColor, props.repoLanguagesData);
    });

</script>

<template>
    <div class="flex h-4 w-full -bg--ge-light-gray rounded-full overflow-hidden">
        <div class="h-full w-[20%]"
        v-if="repoLanguageFinalData"
        :style="{backgroundColor: repoData.color}"
        v-for="repoData in repoLanguageFinalData" :key="repoData"></div>
    </div>
    <div class="flex">
        <div v-for="repoData in repoLanguageFinalData" :key="repoData">
            <p>{{ repoData.language }}</p>
            <p>{{ repoData.percentage }}</p>
        </div>
    </div>
</template>
