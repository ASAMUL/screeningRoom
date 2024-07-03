import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // state: 用于存储用户信息的状态
  state: () => ({
    user: {
      id: null,
      name: "",
      email: "",
    },
    isLoggedIn: false,
  }),
  // actions: 用于定义操作，改变状态
  actions: {
    setUser(userData) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    clearUser() {
      this.user = {
        id: null,
        name: "",
        email: "",
      };
      this.isLoggedIn = false;
    },
  },
  // getters: 用于从状态派生出数据
  getters: {
    userName: (state) => state.user.name,
    userEmail: (state) => state.user.email,
    userId: (state) => state.user.id,
  },
});
