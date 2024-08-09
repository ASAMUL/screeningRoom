<template>
  <div
    class="component-class w-full h-[90%]"
    :style="{ height: `calc(100% - ${themeStore.getNavbarHeight}px)` }"
  >
    <div class="flex h-full">
      <!-- 视频区域 -->
      <div class="flex-1 h-full phone:w-full phone:h-[50%]">
        <div id="dplayer" class="h-full"></div>
      </div>
      <!-- 聊天区域 -->
      <div class="w-[20%] h-full phone:w-full phone:h-[50%]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";
import DPlayer from "dplayer";
import Flv from "flv.js"; //用于播放m3u8格式

const themeStore = useThemeStore();

const loadVideo = () => {
  const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    hotkey: true, //开启热键，支持快进、快退、音量控制、播放暂停
    preload: "auto", //视频预加载，可选值: 'none', 'metadata', 'auto'
    playbackSpeed: [0.5, 1, 2, 4, 8], //播放速度
    video: {
      url: "https://file-examples.com/storage/fe44eeb9cb66ab8ce934f14/2017/04/file_example_MP4_480_1_5MG.mp4",
    },
  });
};
onMounted(() => {
  loadVideo();
  console.log(themeStore.getNavbarHeight);
});
</script>

<style lang="scss" scoped></style>
