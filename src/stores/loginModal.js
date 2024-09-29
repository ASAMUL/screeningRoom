import { defineStore } from "pinia";

export const useLoginModalStore = defineStore("loginModal", {
  state: () => ({
    isLoginModalVisible: false,
  }),
  actions: {
    showLoginModal() {
      this.isLoginModalVisible = true;
    },
    hideLoginModal() {
      this.isLoginModalVisible = false;
    },
  },
});
