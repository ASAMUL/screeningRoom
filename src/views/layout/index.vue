<template>
  <div class="layout-container flex flex-col w-full h-full bg-[#121a21]">
    <div
      class="navbar flex h-14 items-center gap-9 px-4 border-b border-gray-500"
    >
      <!-- Logo -->
      <div class="logo mr-auto flex items-center">
        <n-icon size="20" color="#fff">
          <Bonfire />
        </n-icon>
        <span class="text-xl font-bold text-white">VidSync</span>
      </div>
      <!-- 导航栏 -->
      <div class="nav flex items-center gap-4">
        <n-button type="text" size="small" class="text-white"> 主页 </n-button>
        <n-button type="text" size="small" class="text-white"> 订阅</n-button>
      </div>
      <!-- 图标导航栏 -->
      <div class="nav flex items-center gap-2 cursor-pointer h-3/4">
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
        <div
          class="nav-icon flex items-center gap-2 bg-[#253646] px-3 py-3 rounded-lg"
        >
          <n-icon size="20" color="#fff"> <User /> </n-icon>
        </div>
        flex
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Bonfire, VideocamOutline, SearchOutline } from "@vicons/ionicons5";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped></style>
