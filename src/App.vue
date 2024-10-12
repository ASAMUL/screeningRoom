<template>
  <n-config-provider :theme="themeRef" abstract>
    <n-message-provider>
      <Layout />
      <LoginModal />
      <GlobalLoading />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import Layout from "@/views/layout/index.vue";
import { darkTheme } from "naive-ui";
import { useThemeStore } from "@/stores/theme";
import GlobalLoading from "@/components/GlobalLoading.vue";
import LoginModal from "@/components/LoginModal.vue";
import { useUserStore } from "@/stores/user";
import { ref, watch } from "vue";

const useTheme = useThemeStore();
console.log("🚀 ~ useTheme:", useTheme);
const themeRef = ref(useTheme.isDarkMode ? darkTheme : undefined);
if (useTheme.isDarkMode) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
useTheme.checkIsMobile();

const userStore = useUserStore();
// 检查缓存中是否有用户信息
const userInfo = localStorage.getItem("user");
if (userInfo) {
  userStore.setUser(JSON.parse(userInfo));
}

// 监听 isDarkMode 的变化
watch(
  () => useTheme.isDarkMode,
  (newValue) => {
    console.log("🚀 ~ newValue:", newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      themeRef.value = darkTheme;
    } else {
      document.documentElement.classList.remove("dark");
      themeRef.value = undefined;
    }
  }
);
</script>
<style scoped></style>
