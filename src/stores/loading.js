import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
    loadingText: "加载中",
    showFinishedAnimation: true,
    loadingEndFunction: null,
  }),
  actions: {
    /**
     * 显示加载状态
     * @param {string} [text="加载中"] - 加载时显示的文本
     * @param {boolean} [showFinishedAnimation=true] - 是否显示完成动画
     */
    showLoading(
      text = "加载中",
      showFinishedAnimation = true,
      loadingEndFunction = null
    ) {
      this.loading = true;
      this.loadingText = text;
      this.showFinishedAnimation = showFinishedAnimation;
      this.loadingEndFunction = loadingEndFunction;
    },
    hideLoading() {
      this.loading = false;
      if (this.loadingEndFunction) {
        this.loadingEndFunction();
      }
    },
  },
});
