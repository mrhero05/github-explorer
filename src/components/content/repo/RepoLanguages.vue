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

        // console.log(repoLanguageFinalData.value);
    }

    const getLanguagePercentage = (value, total) =>{
        return parseFloat((value / total) * 100).toFixed(1);
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
    <p class="font-MontserratBold">Languages</p>
    <div class="flex h-4 w-full -bg--ge-light-gray rounded-full overflow-hidden my-[10px]">
        <div class="h-full"
        v-if="repoLanguageFinalData"
        :style="{
            backgroundColor: repoData.color,
            width: `${repoData.percentage}%`
        }"
        v-for="repoData in repoLanguageFinalData" :key="repoData.language"></div>
    </div>
    <div class="flex flex-wrap items-center">
        <div class="flex gap-x-[5px] items-center mx-[10px] my-[5px]" v-for="repoData in repoLanguageFinalData" :key="repoData.language">
            <span class="w-[10px] h-[10px] rounded-full -bg--ge-light-gray"
            :style="{ backgroundColor: repoData.color }"
            ></span>
            <p>{{ repoData.language }}</p>
            <p class="-text--ge-gray text-[0.8rem]">{{ repoData.percentage }} %</p>
        </div>
    </div>
    <hr class="-border--ge-gray2 my-5 px-5">
</template>
