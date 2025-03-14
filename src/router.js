import { createRouter, createWebHistory } from 'vue-router';
import UserContent from '@/components/content/user/UserContent.vue';
import Welcome from '@/components/Welcome.vue';
import RepoContent from '@/components/content/repo/RepoContent.vue';
import AOS from "aos";
import 'aos/dist/aos.css'

const routes = [
    { path: '/', component: Welcome, name: 'Welcome'},
    { path: '/user/:username', component: UserContent, name: 'UserContent', props: true},
    { path: '/repo/:repoName', component: RepoContent, name: 'RepoContent', props: true},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    AOS.init();
    next();
});

export default router;
