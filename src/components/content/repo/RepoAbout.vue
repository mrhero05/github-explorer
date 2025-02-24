<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        repoAbout: String
    });
</script>

<template>
    <p>About</p>
    <div class="p-5 border -border--ge-gray2 rounded-[5px] my-5">
        <p class="-text--ge-gray2">{{ repoAbout }}</p>
    </div>
    <hr class="-border--ge-gray2 my-5 px-5">
</template>
