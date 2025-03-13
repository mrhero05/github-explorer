<script setup>
    import Navbar from '@/components/Navbar.vue';
    import Search from '@/components/Search.vue';
    import Footer from '@/components/Footer.vue';

</script>

<template>
    <Navbar />
    <Search />
    <router-view></router-view>
    <Footer />
</template>
