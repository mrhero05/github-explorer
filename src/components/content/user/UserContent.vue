<template>
    <div class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[100px]">
        <div class="w-full md:w-3/12 p-[20px]">
            <div class="avatar w-full">
                <div class="-ring--ge-gray ring-offset-base-100 w-full rounded-full ring ring-offset-2">
                    <img :src="avatar" alt="profile_logo" />
                </div>
            </div>
            <a :href="github_url" target="_blank" class="-text--ge-black text-[2rem] font-bold font-MontserratBold my-2 mx-auto block w-fit hover:underline">{{ username }}</a>
        </div>
        <div class="w-full md:w-9/12">
            <p>123</p>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { defineProps, ref, computed, onBeforeUpdate, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const avatar = computed( () => route.query.avatar);
    const github_url = computed( () => route.query.github_url);

    const props = defineProps({
        username: String
    });

    // Fetch More Information of Selected user
    const fetch = async (username) => {
        try {
            // const moreInfo = await axios.get(`https://api.github.com/users/${username}/followers`);
            console.log(`https://api.github.com/users/${username}/followers`);
        } catch (error) {
            console.log(error);
        }
    }

    onBeforeUpdate(() => {
        fetch(props.username);
    })

    onMounted(() => {
        fetch(props.username);
    })
</script>
