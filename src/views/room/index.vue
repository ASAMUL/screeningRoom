<template>
  <div
    class="component-class w-full h-[90%]"
    :style="{ height: `calc(100% - ${themeStore.getNavbarHeight}px)` }"
  >
    <div class="flex h-full w-full phone:flex-col relative">
      <!-- 展开收起图标 -->
      <CircleChevronLeft
        class="absolute top-[50%] right-0 z-10 phone:hidden cursor-pointer"
        v-show="!isChatRoomOpen"
        @click="handleChatRoomToggle"
      />
      <!-- 视频区域 -->
      <div
        class="h-full phone:w-full phone:h-[50%] transition-[width] duration-300"
        :class="isChatRoomOpen ? 'w-[80%]' : 'w-[100%]'"
      >
        <div id="dplayer" class="h-full"></div>
      </div>
      <!-- 聊天区域 -->
      <div
        class="h-full phone:w-full phone:h-[50%] flex flex-col relative transition-[width] duration-300"
        :class="isChatRoomOpen ? 'w-[20%]' : 'w-[0]'"
        ref="chatRoomMain"
      >
        <!--展开收起图标-->

        <CircleChevronRight
          class="absolute top-[50%] left-0 z-10 phone:hidden cursor-pointer"
          v-show="isChatRoomOpen"
          @click="handleChatRoomToggle"
        />
        <n-card
          title="聊天室"
          class="flex-1 chat-room overflow-auto"
          :class="!isChatRoomOpen && 'hidden'"
        >
          <div ref="chatRoom">
            <div v-for="(msg, index) in messages" :key="index" class="mb-2">
              <n-space vertical>
                <n-tag type="primary" round>{{ msg.username }}</n-tag>
                <span>{{ msg.content }}</span>
              </n-space>
            </div>
          </div>
        </n-card>
        <div class="p-4" :class="!isChatRoomOpen && 'hidden'">
          <n-form>
            <n-input
              v-model:value="newMessage"
              placeholder="输入消息..."
              :clearable="true"
              passively-activated
              @keyup.enter="handleSend"
            >
              <template #suffix>
                <n-button type="success" round @click="handleSend"
                  ><template #icon> <Send /></template
                ></n-button>
                <n-button round @click="handleSend"
                  ><template #icon> <Smile /></template
                ></n-button>
              </template>
              ></n-input
            >
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, useTemplateRef } from "vue";
import { useThemeStore } from "@/stores/theme";
import {
  Send,
  Smile,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-vue-next";
import { createDiscreteApi } from "naive-ui";

const { notification } = createDiscreteApi(["notification"]);

import DPlayer from "dplayer";
import Flv from "flv.js"; //用于播放m3u8格式
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";

const SOCKET_URL = "http://localhost:8888/ws"; // 根据实际情况调整

const themeStore = useThemeStore();

// 聊天相关的状态
const messages = ref([
  { username: "用户1", content: "你好", timestamp: new Date() },
]);
const newMessage = ref("");
const username = ref("用户" + Math.floor(Math.random() * 1000)); // 随机用户名
const chatRoom = ref(null);

const loadVideo = () => {
  const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    hotkey: true, //开启热键，支持快进、快退、音量控制、播放暂停
    preload: "auto", //视频预加载，可选值: 'none', 'metadata', 'auto'
    playbackSpeed: [0.5, 1, 2, 4, 8], //播放速度
    video: {
      url: "https://web-1313109150.cos.ap-shanghai.myqcloud.com/videos/20241009_165304.mp4",
    },
  });
};

onMounted(() => {
  loadVideo();
  client.activate(); // 激活客户端连接
  console.log(themeStore.getNavbarHeight);
});

const isChatRoomOpen = ref(true);
const chatRoomMain = useTemplateRef("chatRoomMain");
const handleChatRoomToggle = () => {
  isChatRoomOpen.value = !isChatRoomOpen.value;
};

const client = new Client({
  // 使用 SockJS 作为传输协议
  webSocketFactory: () => new SockJS(SOCKET_URL),
  reconnectDelay: 5000,
  debug: (str) => {
    console.log(str);
  },
  onConnect: () => {
    console.log("WebSocket 已连接");

    // 订阅视频主题
    client.subscribe("/topic/video", (message) => {
      const videoData = JSON.parse(message.body);
      // 在此处理接收到的视频控制消息

      console.log("消息", videoData);
    });

    // 订阅聊天主题
    client.subscribe("/topic/chat", (message) => {
      const chatData = JSON.parse(message.body);
      console.log("聊天消息", chatData);
      messages.value.push(chatData);
      nextTick(() => {
        scrollToBottom();
      });
    });
  },
  onStompError: (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  },
});

const sendMessage = (action, currentTime) => {
  const message = { action, currentTime };
  client.publish({
    destination: "/app/video.control",
    body: JSON.stringify(message),
  });
};

// 处理发送聊天消息
const handleSend = () => {
  if (newMessage.value.trim() === "") return;
  const chatMessage = {
    username: username.value,
    content: newMessage.value.trim(),
    timestamp: new Date(),
  };
  try {
    client.publish({
      destination: "/app/chat.message",
      body: JSON.stringify(chatMessage),
    });
    newMessage.value = "";
  } catch (err) {
    console.error("发送消息失败", err);
    notification.error({
      content: "发送消息失败，请稍后再试",
      duration: 3000,
    });
  }
};

// 定义滚动到底部的函数
const scrollToBottom = () => {
  let room = document.querySelector(".chat-room");
  room.scrollTop = room.scrollHeight;

  console.warn(room.scrollHeight, room.scrollTop);
};
</script>

<style lang="scss" scoped>
.component-class {
  display: flex;
  flex-direction: column;
}
</style>
