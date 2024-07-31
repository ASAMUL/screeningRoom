<template>
  <div
    class="index-container flex-1 w-full px-20 phone:px-2 pt-4 overflow-y-auto"
  >
    <div class="w-full h-3/4 relative">
      <n-carousel dot-type="line" show-arrow>
        <n-image
          height="100%"
          width="100%"
          :src="indexImageSrc"
          object-fit="cover"
      /></n-carousel>

      <div class="flex flex-col gap-2 absolute bottom-0 left-0 p-4 phone:pb-2">
        <div class="text-4xl font-bold">放映室，一起看</div>
        <div class="text-2xl font-bold">你想看什么？</div>
        <n-input placeholder="输入房间号或房间名" round>
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@vicons/ionicons5";
import indexImageSrc from "@/assets/images/index_pic.png";
import { useThemeStore } from "@/stores/theme";
import { watch } from "vue";
const themeStore = useThemeStore();
console.log(themeStore.isMobile);
let searchInputPlaceholderColorRef = ref("#fff");
watch(
  () => themeStore.isDarkMode,
  (newValue, oldValue) => {
    searchInputPlaceholderColorRef.value = themeStore.isMobile
      ? themeStore.isDarkMode
        ? "#fff"
        : "#000"
      : themeStore.isDarkMode
      ? "#fff"
      : "black";
  }
);
</script>

<style lang="scss" scoped>
.n-image {
  width: 100%;
}
:deep(.n-input__placeholder) {
  color: v-bind(searchInputPlaceholderColor);
}
</style>
