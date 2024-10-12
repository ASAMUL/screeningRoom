<template>
  <n-modal v-model:show="isVisible">
    <div
      class="modal-content rounded-lg flex bg-light-bg dark:bg-dark-bg py-10 pl-52 phone:pl-24 pr-20 items-center justify-center relative"
    >
      <div
        class="lottie-animation mr-4 absolute top-0 left-0 w-52 h-52 phone:w-30 phone:h-30 phone:left-[30%] phone:top-[-35%]"
      >
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
      <n-tabs default-value="signin" animated v-model:value="activeTab">
        <n-tab-pane name="signin" tab="登录">
          <n-form ref="formRef" :rules="rules" :model="formDataRef">
            <n-form-item label="用户名" path="username">
              <n-input
                v-model:value="formDataRef.username"
                placeholder="请输入用户名"
              />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                v-model:value="formDataRef.password"
                show-password-on="click"
                type="password"
                placeholder="请输入密码"
              />
            </n-form-item>
            <n-button
              type="primary"
              native-type="submit"
              class="mt-4 w-full"
              @click="handleSubmit('login')"
              >登录</n-button
            >
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="register" tab="注册">
          <n-form
            @submit.prevent="handleSubmit('register')"
            ref="formRef"
            :rules="rules"
            :model="formDataRef"
          >
            <n-form-item label="用户名" path="username">
              <n-input
                v-model:value="formDataRef.username"
                placeholder="请输入用户名"
              />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                v-model:value="formDataRef.password"
                show-password-on="click"
                type="password"
                placeholder="请输入密码"
              />
            </n-form-item>
            <n-form-item label="确认密码" path="confirmPassword">
              <n-input
                v-model:value="formDataRef.confirmPassword"
                type="password"
                :disabled="!formDataRef.password"
                placeholder="请确认密码"
              />
            </n-form-item>
            <n-button
              type="primary"
              native-type="submit"
              class="mt-4 w-full"
              @click="handleSubmit('register')"
              >注册</n-button
            >
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import { useLoginModalStore } from "@/stores/loginModal";
import Bear from "@/assets/lottie/bear-tea.json";
import { CloseCircleOutline } from "@vicons/ionicons5";
import { login, register } from "@/api/user";
import { useLoadingStore } from "@/stores/loading";
import { useUserStore } from "@/stores/user";
import { createDiscreteApi } from "naive-ui";

const { notification } = createDiscreteApi(["notification"]);

const store = useLoginModalStore();
const isVisible = computed(() => store.isLoginModalVisible);
const loadingStore = useLoadingStore();
const { showLoading, hideLoading } = loadingStore;
const userStore = useUserStore();
const { setUser } = userStore;

const activeTab = ref("signin");
const formDataRef = ref({
  username: "",
  password: "",
  confirmPassword: "",
});
const formRef = ref(null);

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: [
    {
      required: true,
      trigger: ["input", "blur"],
      validator(_, value) {
        if (!value) {
          return new Error("请输入密码");
        }
        if (value.length < 6) {
          return new Error("密码长度不能小于6位");
        }
        return true;
      },
    },
  ],
  confirmPassword: [
    {
      required: activeTab.value === "register",
      trigger: "blur",
      validator(_, value) {
        if (!value) {
          return new Error("请确认密码");
        }
        if (value !== formDataRef.value.password) {
          return new Error("两次密码不一致");
        }
        return true;
      },
    },
  ],
};

const handleSubmit = (type) => {
  formRef.value
    .validate()
    .then(() => {
      showLoading("登录中", false);
      if (type === "login") {
        return login({
          username: formDataRef.value.username,
          password: formDataRef.value.password,
        })
          .then((res) => {
            console.log(res);
            notification.success({
              content: "登录成功！",
              duration: 2000,
            });
            setUser(res.data);
            store.hideLoginModal();
          })
          .finally(() => {
            hideLoading();
          });
      } else if (type === "register") {
        return register({
          username: formDataRef.value.username,
          password: formDataRef.value.password,
        })
          .then((res) => {
            console.log(res);
            notification.success({
              content: "注册成功！",
              duration: 2000,
            });
            setUser(res.data);
            store.hideLoginModal();
          })
          .finally(() => {
            hideLoading();
          });
      }
    })
    .catch((err) => {
      console.error(err);
      err instanceof Error && message.error(err.message);
    });
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
