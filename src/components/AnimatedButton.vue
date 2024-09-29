<template>
  <div
    class="button-container"
    @mouseenter="debouncedPlayAnimation"
    @mouseleave="debouncedStopAnimation"
    @touchstart="debouncedPlayAnimation"
    @touchend="debouncedStopAnimation"
  >
    <n-button
      @click="handleClick"
      class="phone:w-full phone:text-base text-lg dark:custom-gradient"
      :type="type"
      :round="round"
      :style="{ opacity: showButton ? 1 : 0 }"
    >
      <slot></slot>
    </n-button>
    <div
      ref="animationContainer"
      class="animation-container w-80 h-30 hidden phone:w-40 phone:h-32"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import lottie from "lottie-web";

export default {
  props: {
    animationData: {
      type: Object,
      required: true,
    },
    debounceTime: {
      type: Number,
      default: 200,
    },
    type: {
      type: String,
      default: "primary",
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const animationContainer = ref(null);
    const showButton = ref(true);
    let animation = null;
    let debounceTimer = null;

    const initAnimation = () => {
      if (animation) {
        animation.destroy();
      }
      animation = lottie.loadAnimation({
        container: animationContainer.value,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: props.animationData,
      });
    };
    onMounted(() => {
      initAnimation();
    });

    onUnmounted(() => {
      if (animation) {
        animation.destroy();
      }
    });

    const debounce = (func, delay) => {
      return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
      };
    };

    const showAnimation = () => {
      showButton.value = false;
      animationContainer.value.classList.remove("hidden");
      if (animation) {
        animation.goToAndPlay(0);
      }
    };

    const hideAnimation = () => {
      showButton.value = true;
      animationContainer.value.classList.add("hidden");
      if (animation) {
        animation.stop();
      }
    };

    const debouncedPlayAnimation = debounce(showAnimation, props.debounceTime);
    const debouncedStopAnimation = debounce(hideAnimation, props.debounceTime);
    const handleClick = (event) => {
      emit("click", event);
    };
    return {
      animationContainer,
      showButton,
      debouncedPlayAnimation,
      debouncedStopAnimation,
      handleClick,
    };
  },
};
</script>

<style scoped>
.button-container {
  /* width: 100%; */
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  transition: opacity 0.3s;
}
.custom-gradient {
  @apply bg-gradient-to-r from-[#63e2b7] to-[#3fcf8e]  hover:from-[#3fcf8e] hover:to-[#63e2b7] transition-all duration-300;
}

.animation-container {
  position: absolute;
  /* 在父元素的中心 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
