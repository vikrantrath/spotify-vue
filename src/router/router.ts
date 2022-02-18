import DashBoard from "@/views/DashBoard/DashBoard.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: '', component: DashBoard },
    { path: '/favourite', component: () => import("@/views/Favourite/Favourite.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})

export default router;