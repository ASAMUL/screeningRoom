<template>
  <n-config-provider class="h-full" :theme="themeRef">
    <Layout />
  </n-config-provider>
</template>
<script setup>
import Layout from "@/views/layout/index.vue";
import { darkTheme } from "naive-ui";
import { useThemeStore } from "@/stores/theme";
import { ref } from "vue";
const useTheme = useThemeStore();
const themeRef = ref(useTheme.isDarkMode ? darkTheme : undefined);
</script>
<style scoped></style>
