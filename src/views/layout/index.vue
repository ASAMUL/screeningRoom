<template>
  <div
    class="layout-container flex flex-col w-full h-full dark:bg-[#121a21] bg-[#f8fcfb] dark:text-white"
  >
    <div
      class="navbar flex h-14 items-center gap-4 px-2 border-b border-b-[#e7f3f2] dark:border-gray-500 pl-8 flex-shrink-0"
      id="navbar"
    >
      <!-- Logo -->
      <div class="logo mr-auto flex items-center">
        <n-icon size="20" :color="themeStore.isDarkMode ? '#fff' : '#000'">
          <Bonfire />
        </n-icon>
        <span class="text-xl font-bold">放映室</span>
      </div>
      <!-- 暗黑模式-->
      <n-switch
        v-model:value="themeActive"
        @update:value="handleThemeChange"
        size="large"
      >
        <template #checked-icon>
          <LightModeRound />
        </template>
        <template #unchecked-icon>
          <DarkModeRound />
        </template>
      </n-switch>
      <!-- 导航栏 -->
      <div class="nav flex items-center gap-2">
        <n-button text tag="a" type="primary" size="small"> 主页 </n-button>
        <n-button text tag="a" type="primary" size="small"> AI功能</n-button>
      </div>
      <!-- 图标导航栏 -->
      <div
        class="nav flex items-center gap-2 cursor-pointer h-3/4 phone:hidden"
      >
        <div
          class="nav-icon flex items-center gap-2 dark:bg-[#253646] h-full px-3 rounded-lg bg-gray-200"
        >
          <n-icon size="20" :color="themeStore.isDarkMode ? '#fff' : '#000'">
            <VideocamOutline />
          </n-icon>
        </div>
        <div
          class="nav-icon flex items-center gap-2 dark:bg-[#253646] h-full px-3 rounded-lg bg-gray-200"
        >
          <n-icon size="20" :color="themeStore.isDarkMode ? '#fff' : '#000'">
            <SearchOutline />
          </n-icon>
        </div>
        <!-- <div
          class="nav-icon flex items-center gap-2 bg-[#253646] px-3 py-3 rounded-lg"
        >
          <n-icon size="20" color="#fff"> <User /> </n-icon>
        </div> -->
        <n-avatar
          class="ml-5"
          size="medium"
          bordered
          round
          v-if="store.isLoggedIn"
        />
        <div class="flex" v-else>
          <n-button size="small"> 登录 </n-button>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Bonfire, VideocamOutline, SearchOutline } from "@vicons/ionicons5";
import { DarkModeRound, LightModeRound } from "@vicons/material";
import { useUserStore } from "@/stores/user";
import { useThemeStore } from "@/stores/theme";
import { RouterView } from "vue-router";
const store = useUserStore();
const themeStore = useThemeStore();
// 切换主题
const themeActive = ref(false);
const handleThemeChange = (val) => {
  if (val) {
    document.documentElement.classList.remove("dark");
    themeStore.toggleDarkMode();
  } else {
    document.documentElement.classList.add("dark");
    themeStore.toggleDarkMode();
  }
};

onMounted(() => {
  const navbar = document.getElementById("navbar");
  themeStore.setNavbarHeight(navbar.offsetHeight);
});
</script>

<style lang="scss" scoped></style>
