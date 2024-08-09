import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  // state: 用于存储用户信息的状态
  state: () => ({
    // 是否暗黑模式
    darkMode: true,
    // 设备是否是手机
    mobile: false,
    // 当前导航栏的高度
    navbarHeight: 0,
  }),
  // actions: 用于定义操作，改变状态
  actions: {
    // 切换为暗黑模式
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    // 检测设备是否是手机
    checkIsMobile() {
      let isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      this.mobile = isMobile;
    },
    // 设置导航栏的高度
    setNavbarHeight(height) {
      this.navbarHeight = height;
    },
  },
  // getters: 用于从状态派生出数据
  getters: {
    // 是否暗黑模式
    isDarkMode: (state) => state.darkMode,
    // 设备是否是手机
    isMobile: (state) => state.mobile,
    // 当前导航栏的高度
    getNavbarHeight: (state) => state.navbarHeight,
  },
});
