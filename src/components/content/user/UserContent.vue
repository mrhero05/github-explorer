<template>
    <div class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[100px]">
        <div class="w-full md:w-3/12 p-[20px]">
            <div class="avatar w-full">
                <div class="-ring--ge-gray ring-offset-base-100 w-full rounded-full ring ring-offset-2">
                    <img :src="avatar" alt="profile_logo" />
                </div>
            </div>
            <h2 class="-text--ge-black text-[2rem] font-bold font-MontserratBold text-center my-2">{{ username }}</h2>
        </div>
        <div class="w-full md:w-9/12">
            <p>123</p>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();

    const avatar = ref(route.query.avatar);

    watch(
        () => route.query.avatar,
        (newAvatar) =>{
            avatar.value = newAvatar;
        }
    );

    const props = defineProps({
        username: String,
    });
</script>
