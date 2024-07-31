import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "首页",
    title: "首页",
    component: () => import("../views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
