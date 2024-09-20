import { ref } from "vue";

export function useLoading() {
  const loading = ref(false);
  const loadingText = ref("加载中");
  const finishedAnimation = ref(true);

  function showLoading(text = "加载中", showFinishedAnimation = true) {
    loading.value = true;
    loadingText.value = text;
    finishedAnimation.value = showFinishedAnimation;
  }

  function hideLoading() {
    loading.value = false;
  }

  return {
    loading,
    loadingText,
    showLoading,
    hideLoading,
  };
}
