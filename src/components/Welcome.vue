<template>
    <section class="max-w-[400px] md:max-w-[1140px] mx-auto flex flex-wrap md:mt-[100px]">
        <div class="w-full md:w-1/2">
            <div class="flex-col md:flex-row flex items-center gap-x-[10px] font-bold text-[2rem] mb-[1rem]"
            data-aos="fade-right" data-aos-duration="1000"
            >
                <h1 class="font-MontserratBold text-center">Welcome to Github Explorer</h1>
                <img src="@/assets/icons/rocket.png" alt="rocket">
            </div>
            <div data-aos="fade-right" data-aos-duration="1000">
                <p>Unleash the power of <a href="https://github.com/" class="hover:underline" target="_blank">GitHub</a> with <strong>GitHub Explorer!</strong></p>
                    <p>Explore, analyze, and interact with GitHub data like never before.</p>
            </div>

            <div class="py-[50px]">
                <div class="flex gap-x-[10px] items-center my-[10px]" data-aos="fade-right" data-aos-duration="1000">
                    <font-awesome-icon class="text-[2rem]" :icon="['fab', 'searchengin']" /><strong>Search Users: <span class="font-normal">Find GitHub profiles in seconds.</span></strong>
                </div>
                <div class="flex gap-x-[10px] items-center my-[10px]"
                data-aos="fade-right" data-aos-duration="2000">
                    <font-awesome-icon class="text-[2rem]" :icon="['fab', 'git-alt']" /><strong>Discover Repositories: <span class="font-normal">Access projects, stars, forks, and more.</span></strong>
                </div>
                <div class="flex gap-x-[10px] items-center my-[10px]"
                data-aos="fade-right" data-aos-duration="3000">
                    <font-awesome-icon class="text-[1.7rem]" :icon="['fab', 'gitkraken']" /><strong>Analyze Insights: <span class="font-normal">Gain deeper understanding of contributors and activities.</span></strong>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="3000">
            <img class="w-[350px] ml-auto" src="@/assets/images/github-animate.gif" alt="animate git">
        </div>
    </section>
</template>
<script setup>
</script>
