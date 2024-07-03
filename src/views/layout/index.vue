<template>
  <div class="layout-container flex flex-col w-full h-full">
    <div class="navbar flex h-14 items-center gap-9">
      <div class="logo mr-auto flex">
        <n-icon size="40" color="#0e7a0d" icon-color="black">
          <game-controller />
        </n-icon>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { GameControllerOutline, GameController } from "@vicons/ionicons5";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped></style>
