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
          style="object-position: center; height: 100%"
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
        <!-- <n-input placeholder="输入房间号或房间名" round>
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input> -->
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
      <div class="gap-3 w-full grid grid-cols-3 phone:grid-cols-1 mb-10">
        <!-- <n-button type="primary" round @click="showCreateRoomModal = true"
              >创建房间</n-button
            > -->
        <n-thing content-indented title="一起看" :class="cardClass">
          <template #avatar> 💒 </template>
          创建房间后，即可和小伙伴们一起看电影啦！
          <template #footer>
            <div class="flex justify-start h-40 ml-8">
              <AnimatedButton
                :animation-data="buttonHoverAnimation"
                @click="showCreateRoomModal = true"
                round
                >创建房间</AnimatedButton
              >
            </div>
          </template>
        </n-thing>
        <n-thing content-indented title="加入放映室" :class="cardClass">
          <template #avatar> 🌆 </template>
          输入房间号，加入小伙伴们的放映室吧！
          <template #footer>
            <div class="flex justify-start h-40 ml-8">
              <AnimatedButton
                :animation-data="DogMove"
                @click="showCreateRoomModal = true"
                round
                >加入房间</AnimatedButton
              >
            </div>
          </template>
        </n-thing>
        <n-thing content-indented title="查看列表" :class="cardClass">
          <template #avatar> 🌇 </template>
          查看列表，选择你喜欢的视频，一起看吧！
          <template #footer>
            <div class="flex justify-start h-40 ml-8">
              <AnimatedButton
                :animation-data="CatInBox"
                @click="showCreateRoomModal = true"
                round
                >查看列表</AnimatedButton
              >
            </div>
          </template>
        </n-thing>
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
    <!-- <GlobalLoading v-model="showGlobalLoading" showFinishedAnimation /> -->
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { Search } from "@vicons/ionicons5";
import indexImageSrc3 from "@/assets/images/index_pic_3.jpg";
import AnimatedButton from "@/components/AnimatedButton.vue";
import buttonHoverAnimation from "@/assets/lottie/button_hover.json";
import DogMove from "@/assets/lottie/dog_move.json";
import CatInBox from "@/assets/lottie/cat_in_box.json";
import ModalFooterButton from "@/components/ModalFooterButton.vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const { showLoading, hideLoading } = loadingStore;
const themeStore = useThemeStore();
let searchInputPlaceholderColorRef = ref("#fff");
const router = useRouter();
const formRef = ref(null);
const rules = {
  video: {
    required: true,
    message: "请选择要看的视频",
  },
};
const createRoomModel = ref({});
const showCreateRoomModal = ref(false);
const textArrRef = ref([
  "帮助你的小伙伴们更好的开冲！",
  "你在干什么？快来冲！",
  "冲，带来无限可能！",
]);
const currentTextRef = ref(textArrRef.value[0]);
const textWidth = ref(0);
const textRef = ref(null);
const cardClass = ref(
  "p-4 bg-gradient-to-br from-card-light-gradient-start via-card-light-gradient-middle to-card-light-gradient-end dark:from-card-dark-gradient-start dark:via-card-dark-gradient-middle dark:to-card-dark-gradient-end rounded-lg shadow-md dark:shadow-lg transition-all duration-300"
);

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
    if (!errors) {
      showLoading("创建房间中...", true, () => {
        // 跳转到视频页
        showCreateRoomModal.value = false;
        router.push({
          path: "/room",
          // query: {
          //   video: createRoomModel.value.video,
          // },
        });
      });
      setTimeout(() => {
        hideLoading();
      }, 500);
    }
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
