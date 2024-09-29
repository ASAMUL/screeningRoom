import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";
import Vue3Lottie from "vue3-lottie";
import { createPinia } from "pinia";
import router from "./router";
// 注册全局组件
import AnimatedButton from "./components/AnimatedButton.vue";
const pinia = createPinia();
createApp(App)
  .use(naive)
  .use(router)
  .use(pinia)
  .use(Vue3Lottie)
  .component("AnimatedButton", AnimatedButton)
  .mount("#app");
