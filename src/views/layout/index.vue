<template>
  <div class="layout-container flex flex-col w-full h-full bg-[#121a21]">
    <div
      class="navbar flex h-14 items-center gap-4 px-2 border-b border-gray-500"
    >
      <!-- Logo -->
      <div class="logo mr-auto flex items-center">
        <n-icon size="20" color="#fff">
          <Bonfire />
        </n-icon>
        <span class="text-xl font-bold text-white">VidSync</span>
      </div>
      <!-- 暗黑模式-->
      <n-switch v-model:value="active" size="large">
        <template #checked-icon>
          <DarkModeFilled />
        </template>
        <template #unchecked-icon>
          <DarkModeFilled />
        </template>
      </n-switch>
      <!-- 导航栏 -->
      <div class="nav flex items-center gap-2">
        <n-button type="text" size="small" class="text-white"> 主页 </n-button>
        <n-button type="text" size="small" class="text-white"> 订阅</n-button>
      </div>
      <!-- 图标导航栏 -->
      <div
        class="nav flex items-center gap-2 cursor-pointer h-3/4 phone:hidden"
      >
        <div
          class="nav-icon flex items-center gap-2 bg-[#253646] px-3 py-3 rounded-lg"
        >
          <n-icon size="20" color="#fff"> <VideocamOutline /> </n-icon>
        </div>
        <div
          class="nav-icon flex items-center gap-2 bg-[#253646] px-3 py-3 rounded-lg"
        >
          <n-icon size="20" color="#fff"> <SearchOutline /> </n-icon>
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
          <n-button size="small" class="text-white"> 登录 </n-button>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Bonfire, VideocamOutline, SearchOutline } from "@vicons/ionicons5";
import { DarkModeFilled } from "@vicons/material";
import { useUserStore } from "@/stores/user";
import { RouterView } from "vue-router";
const store = useUserStore();
</script>

<style lang="scss" scoped></style>
