<template>
  <div class="px-10 py-1 overflow-y-auto phone:px-4">
    <div>
      <div class="w-[30rem] my-4 phone:w-full">
        <n-input v-model:value="searchValue" placeholder="想搜索点什么好呢">
          <template #suffix> <Search /></template>
        </n-input>
      </div>
      <!-- 上方tab -->
      <n-tabs
        type="line"
        animated
        class=""
        size="large"
        v-model:value="activeTab"
      >
        <n-tab-pane name="动漫" tab="动漫">
          <!-- 上方筛选 -->
          <div v-for="item in videoTypeList" :key="item" class="text-lg mb-4">
            <n-flex>
              <div>{{ item + "   >" }}</div>
              <div v-if="item === '剧情'">
                <n-flex size="large">
                  <div v-for="plot in plotList" :key="plot">
                    <n-button
                      :type="plotCurrent === plot ? 'primary' : 'default'"
                      size="small"
                      @click="
                        plotCurrent = plot;
                        getVideoListData();
                      "
                      >{{ plot }}</n-button
                    >
                  </div>
                </n-flex>
              </div>
              <div v-if="item === '年份'">
                <n-flex size="large">
                  <div v-for="year in yearList" :key="year">
                    <n-button
                      :type="yearCurrent === year ? 'primary' : 'default'"
                      size="small"
                      @click="
                        yearCurrent = year;
                        getVideoListData();
                      "
                      >{{ year }}</n-button
                    >
                  </div>
                </n-flex>
              </div>
            </n-flex>
          </div>
          <!-- 下方视频列表 -->
          <div
            class="grid grid-cols-[repeat(8,15rem)] gap-x-4 phone:grid-cols-3 py-4"
          >
            <div
              v-for="item in videoListRef"
              :key="item"
              @click="goToVideoDetail(item.id)"
              class="group flex flex-col items-center gap-2 phone:min-h-[13rem] min-h-[20rem] cursor-pointer relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              ></div>
              <n-image
                class="rounded w-full h-full"
                :src="item.coverUrl"
                preview-disabled
              />
              <div
                class="text-center transition-colors duration-300 group-hover:text-primary"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="电影" tab="电影"> 电影 </n-tab-pane>
      </n-tabs>
    </div>

    <GoBackButton class="phone:hidden" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getVideoList } from "@/api/video";
import { Search } from "lucide-vue-next";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const { showLoading, hideLoading } = loadingStore;
import { useRouter } from "vue-router";
const router = useRouter();

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

import GoBackButton from "@/components/GoBackButton.vue";
const activeTab = ref("动漫");
const videoTypeList = ref(["剧情", "年份"]);
const plotList = ref(["全部", "后宫"]);
const plotCurrent = ref("全部");
const yearList = ref(["全部", "2024", "2023", "2022", "2021", "2020"]);
const yearCurrent = ref("全部");

onMounted(() => {
  getVideoListData();
});
const pageNumRef = ref(1);
const pageSizeRef = ref(10);
const videoListRef = ref([]);

const getVideoListData = () => {
  showLoading("加载视频中...", false, null);
  let params = {
    pageNum: pageNumRef.value,
    pageSize: pageSizeRef.value,
  };
  if (plotCurrent.value !== "全部") {
    params.type = plotCurrent.value;
  }
  if (yearCurrent.value !== "全部") {
    params.year = yearCurrent.value;
  }
  getVideoList(params)
    .then((res) => {
      console.log(res);
      videoListRef.value = res.data?.records || [];
    })
    .finally(() => {
      hideLoading();
    });
};

const goToVideoDetail = (id) => {
  router.push({
    path: "/room",
    query: {
      videoId: id,
      roomId: Math.floor(Math.random() * 10000000),
      createBy: userStore.username,
    },
  });
};
</script>
