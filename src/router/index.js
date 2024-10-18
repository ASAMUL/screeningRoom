import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "首页",
    title: "首页",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/room",
    name: "放映室",
    title: "放映室",
    component: () => import("../views/room/index.vue"),
  },
  {
    path: "/videoList",
    name: "视频列表",
    title: "视频列表",
    component: () => import("../views/videoList/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
