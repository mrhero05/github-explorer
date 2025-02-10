import { createRouter, createWebHistory } from 'vue-router';
import UserContent from '@/components/content/user/UserContent.vue';
import Welcome from '@/components/Welcome.vue';

const routes = [
    { path: '/', component: Welcome, name: 'Welcome'},
    { path: '/user/:username', component: UserContent, name: 'UserContent', props: true},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
