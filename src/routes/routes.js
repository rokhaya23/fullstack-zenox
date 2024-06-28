import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/HomePage.vue";
import QuestionsPage from "@/components/QuestionsPage.vue";
import TagsPage from "@/components/TagsPage.vue";
import QuestionsForm from "@/components/QuestionsForm.vue";
import AnswerPage from "@/components/AnswerPage.vue";
import ProfilPage from "@/components/ProfilPage.vue";
import UserPage from '@/components/UserPage.vue';


const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/questions',
        component: QuestionsPage,
        name: 'questions'
    },
    {
        path: '/questionsform',
        component: QuestionsForm,
        name: 'questionsform',
        meta: { requiresAuth: true }
    },
    {
        path: '/tags',
        component: TagsPage,
        name: 'tags',
        meta: { requiresAuth: true }
    },
    {
        path: '/answers/:questionId',
        component: AnswerPage,
        name: 'answer',
        meta: { requiresAuth: true }
    },
    {
        path: '/profil/:userId',
        component: ProfilPage,
        name: 'profil'
    },
    {
        path: '/user',
        component: UserPage,
        name: 'users',
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const loggedIn = !!localStorage.getItem('access_token');

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
