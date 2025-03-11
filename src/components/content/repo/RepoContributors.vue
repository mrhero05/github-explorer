<script setup>
    import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        repoName: String,
        repoContributorsUrl: String
    });

    const repoContributors = ref([]);

    const fetch = async (repoContributorsUrl) => {
        const [getContributors] = await Promise.all([
            axios.get(repoContributorsUrl),
        ]);
        repoContributors.value = getContributors.data;
        console.log(repoContributorsUrl);
        console.log(repoContributors.value);

    }

    watch(() => props.repoContributorsUrl, (newrepoURL) =>{
        if(newrepoURL){
            fetch(newrepoURL);
        }
    });

    onMounted(() => {
        fetch(props.repoContributorsUrl);
    })
</script>

<template>
    <p class="font-MontserratBold">Contributors</p>
    <div class="avatar-group -space-x-3">
        <div class="avatar w-[50px] h-[50px]"
        v-for="contrib in repoContributors.slice(0, 8)"
        >
            <div class="-ring--ge-gray ring-offset-base-100 w-full rounded-full ring ring-offset-2">
                <a :href="contrib.html_url" target="_blank">
                    <img :src="contrib.avatar_url" alt="profile_logo" />
                </a>
            </div>
        </div>
    </div>
    <div class="avatar-group -space-x-3">
        <div class="avatar w-[50px] h-[50px]"
        v-if="repoContributors.length > 8"
        v-for="contrib in repoContributors.slice(8, 15)"
        >
            <div class="-ring--ge-gray ring-offset-base-100 w-full rounded-full ring ring-offset-2">
                <a :href="contrib.html_url" target="_blank">
                    <img :src="contrib.avatar_url" alt="profile_logo" />
                </a>
            </div>
        </div>
        <div class="avatar avatar-placeholder w-[50px] h-[50px]"
        v-if="repoContributors.length > 16"
        >
            <div class="bg-neutral text-neutral-content w-12 !flex justify-center items-center">
                <span>+{{ repoContributors.length - 15 }}</span>
            </div>
        </div>
    </div>
</template>
