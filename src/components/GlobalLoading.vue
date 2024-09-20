<template>
  <div
    ref="loadingContainer"
    class="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-[99999] hidden"
  >
    <div v-if="loadingText && loading" class="text-white text-xl mb-4">
      {{ loadingText }}
    </div>
    <div ref="animationContainer" class="w-[300px] h-[300px]"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import lottie from "lottie-web";
import loadingAnimation from "@/assets/lottie/around_earth.json";
import finishedAnimation from "@/assets/lottie/success.json";

import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from "pinia";
const loadingStore = useLoadingStore();
const { hideLoading } = loadingStore;
const { loading, loadingText, showFinishedAnimation } =
  storeToRefs(loadingStore);
console.log(showFinishedAnimation, loading, loadingText, "loading");

const animationContainer = ref(null);
const loadingContainer = ref(null);
let animation = null;

const loadAnimation = (animationData) => {
  if (animation) {
    animation.destroy();
  }
  animation = lottie.loadAnimation({
    container: animationContainer.value,
    renderer: "svg",
    loop: animationData === loadingAnimation,
    autoplay: true,
    animationData: animationData,
  });
  console.log(animationData === finishedAnimation, "animation");
  if (animationData === finishedAnimation) {
    animation.addEventListener("complete", () => {
      hideLoading();
      loadingContainer.value.classList.add("hidden");
      if (animation) {
        animation.destroy();
      }
    });
  }
};

watch(loading, (newValue) => {
  if (newValue) {
    loadingContainer.value.classList.remove("hidden");
    loadAnimation(loadingAnimation);
  } else if (showFinishedAnimation.value) {
    loadAnimation(finishedAnimation);
  }
});

onMounted(() => {
  if (loading.value) {
    loadAnimation(loadingAnimation);
  }
});

onUnmounted(() => {
  if (animation) {
    animation.destroy();
  }
});
</script>
