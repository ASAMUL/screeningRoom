<template>
  <n-config-provider :theme="themeRef" abstract>
    <Layout />
    <LoginModal />
    <GlobalLoading />
  </n-config-provider>
</template>
<script setup>
import Layout from "@/views/layout/index.vue";
import { darkTheme } from "naive-ui";
import { useThemeStore } from "@/stores/theme";
import GlobalLoading from "@/components/GlobalLoading.vue";
import LoginModal from "@/components/LoginModal.vue";
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
