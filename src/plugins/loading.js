import GlobalLoading from "@/components/GlobalLoading.vue";

import { useLoading } from "@/hooks/useLoading";
const { loading, loadingText, showLoading, hideLoading } = useLoading();

export default {
  install: (app) => {
    app.component("GlobalLoading", GlobalLoading);
    app.config.globalProperties.$showLoading = showLoading;
    app.config.globalProperties.$hideLoading = hideLoading;
  },
};
