import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/films",
        name: "films",
        meta: { type: "films" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/films/:id",
        name: "films-item",
        component: () => import("@/views/ItemView.vue"),
    },
    {
        path: "/people",
        name: "people",
        meta: { type: "people" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/people/:id",
        name: "person",
        component: () => import("@/views/PersonView.vue"),
    },
    {
        path: "/planets",
        name: "planets",
        meta: { type: "planets" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/planets/:id",
        name: "planets-item",
        component: () => import("@/views/ItemView.vue"),
    },

    {
        path: "/species",
        name: "species",
        meta: { type: "species" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/species/:id",
        name: "species-item",
        component: () => import("@/views/ItemView.vue"),
    },
    {
        path: "/starships",
        name: "starships",
        meta: { type: "starships" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/starships/:id",
        name: "starships-item",
        component: () => import("@/views/ItemView.vue"),
    },
    {
        path: "/vehicles",
        name: "vehicles",
        meta: { type: "vehicles" },
        component: () => import("@/views/ItemsView.vue"),
    },
    {
        path: "/vehicles/:id",
        name: "vehicles-item",
        component: () => import("@/views/ItemView.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/views/NonFoundView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
