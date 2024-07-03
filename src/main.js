import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui";
import { createPinia } from "pinia";
import router from "./router";
const pinia = createPinia();
createApp(App).use(naive).use(router).use(pinia).mount("#app");
