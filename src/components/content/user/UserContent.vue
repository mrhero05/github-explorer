<script setup>
    import axios from 'axios';
    import UserRepository from '@/components/content/user/UserRepository.vue';
    import UserContribution from '@/components/content/user/UserContribution.vue';
    import { defineProps, ref, toRefs, computed, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const avatar = computed( () => route.query.avatar);
    const github_url = computed( () => route.query.github_url);
    const [followers, following, info] = [ref(0), ref(0), ref('')];

    const props = defineProps({
        username: String
    });

    // Fetch More Information of Selected user
    const fetch = async (username) => {
        try {
            const [getInfo, getFollowers, getFollowing] = await Promise.all([
                // Fetch user personal information
                axios.get(`https://api.github.com/users/${username}`),
                // Fetch user followers
                axios.get(`https://api.github.com/users/${username}/followers`),
                // Fetch user following
                axios.get(`https://api.github.com/users/${username}/following`)

            ]);

            // Declare each data
            info.value = getInfo.data;
            followers.value = getFollowers.data.length;
            following.value = getFollowing.data.length;

        } catch (error) {
            console.log(error);
        }
    }

    watch( () => props.username, (newUsername) =>{
        if(newUsername){
            fetch(props.username);
        }
    });

    onMounted(() => {
        fetch(props.username);
    })
</script>

<template>
    <div class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[50px]">
        <div class="w-full md:w-3/12 p-[10px]" data-aos="fade-right" data-aos-duration="2000">
            <div class="avatar w-full">
                <div class="-ring--ge-gray ring-offset-base-100 w-full rounded-full ring ring-offset-2">
                    <img :src="avatar" alt="profile_logo" />
                </div>
            </div>
            <a :href="github_url" target="_blank" class="-text--ge-black text-[2rem] font-bold font-MontserratBold my-2 mx-auto block w-fit hover:underline">{{ username }}</a>
            <div class="flex items-center gap-x-[10px] justify-center">
                <font-awesome-icon :icon="['fas', 'users']" />
                <p class="font-bold">{{ followers }} <span class="font-normal">followers</span></p>
                ●
                <p class="font-bold">{{ following }} <span class="font-normal">following</span></p>
            </div>
            <!-- Bio -->
            <div class="flex w-full flex-col border-opacity-50">
                <div class="divider">Bio</div>
            </div>
            <textarea class="textarea textarea-bordered w-full h-[120px]" disabled>{{ info.bio }}</textarea>
            <!-- Location -->
             <div v-if="info.location" class="flex items-center gap-x-[10px]">
                 <font-awesome-icon :icon="['fas', 'location-dot']" />
                 {{ info.location }}
             </div>

        </div>
        <div class="w-full md:w-9/12 p-[10px_20px]">
            <div class="flex items-center gap-x-[10px] mb-4" data-aos="fade-right" data-aos-duration="2000">
                <img class="w-[30px] h-[30px]" src="@/assets/icons/github-mark.png" alt="github_icon">
                <p class="text-[1.5rem]">Repositories</p>
            </div>
            <div class="flex gap-[20px] my-4 flex-wrap">
                <UserRepository :username="username" />
            </div>
                <UserContribution :username="username" />
        </div>
    </div>
</template>
