<template>
  <n-modal v-model:show="isVisible">
    <div
      class="modal-content rounded-lg flex bg-light-bg dark:bg-dark-bg py-20 pl-48 pr-20 items-center justify-center relative"
    >
      <div class="lottie-animation mr-4 absolute top-0 left-0 w-52 h-52">
        <!-- Lottie 动画占位符 -->
        <Vue3Lottie :animationData="Bear" />
      </div>
      <!-- 右上角关闭按钮-->
      <n-button
        class="absolute top-0 right-0"
        @click="store.hideLoginModal"
        strong
        secondary
        circle
      >
        <template #icon>
          <n-icon>
            <CloseCircleOutline />
          </n-icon>
        </template>
      </n-button>
      <n-form @submit.prevent="handleSubmit" class="flex-1">
        <n-form-item label="用户名">
          <n-input v-model:value="username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input
            v-model:value="password"
            show-password-on="click"
            type="password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-button type="primary" native-type="submit" class="mt-4"
          >登录</n-button
        >
      </n-form>
    </div>
  </n-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import { useLoginModalStore } from "@/stores/loginModal";
import Bear from "@/assets/lottie/bear-tea.json";
import { CloseCircleOutline } from "@vicons/ionicons5";

const store = useLoginModalStore();
const isVisible = computed(() => store.isLoginModalVisible);

const username = ref("");
const password = ref("");

const handleSubmit = () => {
  // TODO: 处理登录逻辑
  console.log("用户名:", username.value);
  console.log("密码:", password.value);
  store.hideLoginModal();
};
</script>

<style scoped>
.modal-content {
  display: flex;
  align-items: center;
}
.lottie-animation {
}
</style>
