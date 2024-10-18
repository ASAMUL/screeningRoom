import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // state: 用于存储用户信息的状态
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {
      id: "",
      username: "",
      token: "",
    },
    isLoggedIn: !!localStorage.getItem("user"),
  }),
  // actions: 用于定义操作，改变状态
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      this.isLoggedIn = true;
    },
    clearUser() {
      this.user = {
        id: "",
        username: "",
        token: "",
      };
      this.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
  // getters: 用于从状态派生出数据
  getters: {
    username: (state) => state.user.username,
    userId: (state) => state.user.id,
  },
});
