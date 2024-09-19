<template>
  <div
    v-show="model"
    class="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-[99999]"
  >
    <div v-if="loadingText" class="text-white text-xl mb-4">
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

const model = defineModel();

const props = defineProps({
  showFinishedAnimation: {
    type: Boolean,
    default: true,
  },
  loadingText: {
    type: String,
    default: "加载中",
  },
});

const animationContainer = ref(null);
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

  if (animationData === finishedAnimation) {
    animation.addEventListener("complete", () => {
      model.value = false;
    });
  }
};

watch(model, (newValue) => {
  if (newValue) {
    loadAnimation(loadingAnimation);
  } else if (props.showFinishedAnimation) {
    loadAnimation(finishedAnimation);
  }
});

onMounted(() => {
  if (model.value) {
    loadAnimation(loadingAnimation);
  }
});

onUnmounted(() => {
  if (animation) {
    animation.destroy();
  }
});
</script>
