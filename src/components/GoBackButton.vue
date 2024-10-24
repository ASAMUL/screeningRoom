<template>
  <n-float-button
    :right="10"
    :bottom="'50%'"
    shape="square"
    type="primary"
    @click="goBack"
  >
    <n-icon>
      <ArrowLeftToLine />
    </n-icon>
  </n-float-button>
</template>
<script setup>
import { ArrowLeftToLine } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
