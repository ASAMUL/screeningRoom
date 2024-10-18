<template>
  <div class="px-10 py-1">
    <div>
      <n-tabs
        type="line"
        animated
        class=""
        size="large"
        v-model:value="activeTab"
      >
        <n-tab-pane name="动漫" tab="动漫">
          <div v-for="item in videoTypeList" :key="item" class="text-lg mb-4">
            <n-flex>
              <div>{{ item + "   >" }}</div>
              <div v-if="item === '剧情'">
                <n-flex size="large">
                  <div v-for="plot in plotList" :key="plot">
                    <n-button
                      :type="plotCurrent === plot ? 'primary' : 'default'"
                      size="small"
                      @click="plotCurrent = plot"
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
                      @click="yearCurrent = year"
                      >{{ year }}</n-button
                    >
                  </div>
                </n-flex>
              </div>
            </n-flex>
          </div>
        </n-tab-pane>
        <n-tab-pane name="电影" tab="电影"> 电影 </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const activeTab = ref("动漫");
const videoTypeList = ref(["剧情", "年份"]);
const plotList = ref(["全部", "后宫"]);
const plotCurrent = ref("全部");
const yearList = ref(["全部", "2024", "2023", "2022", "2021", "2020"]);
const yearCurrent = ref("全部");

onMounted(() => {
  getVideoList();
});

const getVideoList = () => {};
</script>
