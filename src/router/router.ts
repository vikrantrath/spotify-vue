import DashBoard from "@/views/DashBoard/DashBoard.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
    { path: '', component: DashBoard },
    { path: '/favourite', component: () => import("@/views/Favourite/Favourite.vue") },
    { path: '/library', component: () => import("@/views/Library/Library.vue") },
    { path: '/album/:_id', component: () => import("@/views/Album/Album.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})

export default router;