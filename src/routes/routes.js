import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/HomePage.vue";
import QuestionsPage from "@/components/QuestionsPage.vue";
import TagsPage from "@/components/TagsPage.vue";
import QuestionsForm from "@/components/QuestionsForm.vue";


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
        name: 'questionsform'
    },
    {
        path: '/tags',
        component: TagsPage,
        name: 'tags'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
