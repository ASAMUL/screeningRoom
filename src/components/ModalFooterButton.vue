<template>
  <div
    class="modal-footer-button-container flex justify-center items-center gap-2"
  >
    <n-button round @click="$emit('cancel')"> {{ cancelText }}</n-button>
    <n-button type="primary" round @click="$emit('confirm')">
      {{ confirmText }}
    </n-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  cancelText: {
    type: String,
    default: "取消",
  },
  confirmText: {
    type: String,
    default: "确定",
  },
});
</script>

<style lang="scss" scoped></style>
