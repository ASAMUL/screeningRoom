<template>
  <div
    class="index-container flex-1 w-full px-60 phone:px-2 pt-4 overflow-y-auto"
  >
    <div class="w-full h-3/4 phone:h-3/5 relative mb-6">
      <n-carousel dot-type="line" show-arrow>
        <n-image
          height="100%"
          width="100%"
          :src="indexImageSrc3"
          object-fit="cover"
          style="object-position: center"
        />
      </n-carousel>

      <div class="flex flex-col gap-2 absolute bottom-0 left-0 p-4 phone:pb-2">
        <div
          class="text-4xl font-bold phone:text-black dark:text-white text-white phone:text-xl"
        >
          放映室，一起看
        </div>
        <div
          class="text-2xl font-bold phone:text-black dark:text-white text-white phone:text-xl"
        >
          你想看什么？
        </div>
        <n-input placeholder="输入房间号或房间名" round>
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
    </div>

    <div class="mb-10">
      <p
        :key="currentTextRef"
        ref="textRef"
        class="text-4xl font-bold mb-6 line phone:text-xl"
        :style="{ '--text-width': textWidth + 'px' }"
      >
        {{ currentTextRef }}
      </p>
      <p class="text-md dark:black-200 phone:text-sm">
        这里应该有很多的描述，但我只会不停的鹿
      </p>
    </div>

    <div class="w-full">
      <p class="text-2xl font-bold mb-6 phone:text-xl">
        请选择你要的操作，艾拉呗！
      </p>
      <div class="gap-3 w-full grid grid-cols-3">
        <!-- <n-button type="primary" round @click="showCreateRoomModal = true"
              >创建房间</n-button
            > -->
        <div class="flex justify-center items-center h-56">
          <AnimatedButton
            :animation-data="buttonHoverAnimation"
            @click="showCreateRoomModal = true"
            round
            >创建房间</AnimatedButton
          >
        </div>
        <div class="flex justify-center items-center">
          <AnimatedButton
            :animation-data="DogMove"
            @click="showCreateRoomModal = true"
            round
            >加入房间</AnimatedButton
          >
        </div>
        <div class="flex justify-center items-center">
          <AnimatedButton
            :animation-data="CatInBox"
            @click="showCreateRoomModal = true"
            round
            >查看列表</AnimatedButton
          >
        </div>
      </div>
    </div>

    <n-modal v-model:show="showCreateRoomModal" class="w-[50rem] phone:w-full">
      <n-card
        solt="default"
        title="💒创建一个房间"
        :bordered="false"
        size="huge"
        role="dialog"
        preset="card"
        closable
        @close="showCreateRoomModal = false"
        aria-modal="true"
      >
        <template #header-extra> 噢！ </template>
        <n-form ref="formRef" :model="createRoomModel" :rules="rules"
          ><n-form-item path="video" label="要看的视频">
            <n-auto-complete
              placeholder="请选择要看的视频"
              v-model:value="createRoomModel.video"
            />
          </n-form-item>

          <n-form-item path="password" label="房间密码(可选)">
            <n-input placeholder="" v-model:value="createRoomModel.age" />
          </n-form-item>
        </n-form>
        <template #footer>
          <ModalFooterButton
            @confirm="handlerCreateRoomConfirm"
            @cancel="showCreateRoomModal = false"
          />
        </template>
      </n-card>
    </n-modal>
    <GlobalLoading v-model="showGlobalLoading" showFinishedAnimation />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { Search } from "@vicons/ionicons5";
import GlobalLoading from "@/components/GlobalLoading.vue";
import indexImageSrc from "@/assets/images/index_pic.png";
import indexImageSrc2 from "@/assets/images/index_pic_2.jpg";
import indexImageSrc3 from "@/assets/images/index_pic_3.jpg";
import AnimatedButton from "@/components/AnimatedButton.vue";
import buttonHoverAnimation from "@/assets/lottie/button_hover.json";
import DogMove from "@/assets/lottie/dog_move.json";
import CatInBox from "@/assets/lottie/cat_in_box.json";
import ModalFooterButton from "@/components/ModalFooterButton.vue";
import router from "@/router";
import { useThemeStore } from "@/stores/theme";
import { watch } from "vue";
const themeStore = useThemeStore();
let searchInputPlaceholderColorRef = ref("#fff");
const formRef = ref(null);
const createRoomModel = ref({});
const createRoom = "🏕️ 创建放映室";
const showCreateRoomModal = ref(false);
const joinRoom = "🏝️ 加入放映室";
const textArrRef = ref([
  "帮助你的小伙伴们更好的开冲！",
  "你在干什么？快来冲！",
  "冲，带来无限可能！",
]);
const currentTextRef = ref(textArrRef.value[0]);
const textWidth = ref(0);
const textRef = ref(null);

// 全局loading
const showGlobalLoading = ref(false);
const finishedGlobalLoading = ref(false);

const updateTextWidth = () => {
  if (textRef.value) {
    textWidth.value = textRef.value.scrollWidth;
  }
};
const changeText = () => {
  let index = textArrRef.value.indexOf(currentTextRef.value);
  if (index === textArrRef.value.length - 1) {
    index = 0;
  } else {
    index++;
  }

  currentTextRef.value = textArrRef.value[index];
  nextTick(updateTextWidth);
};
setInterval(() => {
  changeText();
}, 6000);
onMounted(() => {
  // 初始计算宽度
  textWidth.value = textRef.value.scrollWidth;
});
() => themeStore.isDarkMode,
  (newValue, oldValue) => {
    searchInputPlaceholderColorRef.value = themeStore.isMobile
      ? themeStore.isDarkMode
        ? "#fff"
        : "#000"
      : themeStore.isDarkMode
      ? "#fff"
      : "black";
  };

const handlerCreateRoomConfirm = () => {
  formRef.value?.validate((errors) => {
    showGlobalLoading.value = true;
    // if (!errors) {
    //   // 跳转到视频页
    //   router.push({
    //     path: "/room",
    //     query: {
    //       video: createRoomModel.value.video,
    //     },
    //   });
    // } else {
    //   console.log("error", errors);
    // }
    setTimeout(() => {
      finishedGlobalLoading.value = true;

      showGlobalLoading.value = false;
    }, 1000);
  });
};
</script>

<style lang="scss" scoped>
.n-image {
  width: 100%;
}

:deep(.n-carousel.n-carousel--show-arrow.n-carousel--bottom .n-carousel__dots) {
  bottom: 12px;
  left: 50%;
}

@media screen and (min-width: 600px) {
  .line {
    border-right: 2px solid #eee;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    animation: grow 4s steps(44) 1s normal both,
      blink 0.5s steps(44) infinite normal;
  }
}

@keyframes grow {
  from {
    width: 0;
  }

  to {
    width: var(--text-width);
  }
}
@keyframes blink {
  from {
    border-right-color: #eee;
  }

  to {
    border-right-color: #222;
  }
}

:deep(.n-input__placeholder) {
  color: v-bind(searchInputPlaceholderColor);
}
</style>
