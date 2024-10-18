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
        class="h-full phone:w-full phone:h-[50%] transition-[width] duration-300 relative"
        :class="isChatRoomOpen ? 'w-[77%]' : 'w-[100%]'"
      >
        <div
          v-if="showPlayButton"
          class="absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center z-10"
        >
          <n-button type="primary" @click="handleCancelMute">取消静音</n-button>
        </div>
        <div id="dplayer" class="h-full"></div>
      </div>
      <!-- 聊天区域 -->
      <div
        class="h-full phone:w-full phone:h-[50%] flex flex-col relative transition-[width] duration-300"
        :class="isChatRoomOpen ? 'w-[23%]' : 'w-[0]'"
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
                <n-tag round type="primary">{{ msg.username }}</n-tag>
                <span :id="msg.requestId">{{ msg.content }}</span>
              </n-space>
            </div>
          </div>
        </n-card>
        <div class="p-4 flex gap-1" :class="!isChatRoomOpen && 'hidden'">
          <n-mention
            :options="options"
            default-value="@"
            v-model:value="newMessage"
            placeholder="按@可以呼唤AI，或者直接输入消息..."
            size="large"
            autosize
            @keydown.enter.prevent="handleEnterSend"
            type="textarea"
          />
          <n-button type="success" round @click="handleSend"
            ><template #icon> <Send /></template
          ></n-button>
          <n-button round @click="handleSend"
            ><template #icon> <Smile /></template
          ></n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, useTemplateRef, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import {
  Send,
  Smile,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-vue-next";
import { createDiscreteApi } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
console.log("userStore", userStore);
const { notification } = createDiscreteApi(["notification"]);

const { currentRoute } = useRouter();
const { roomId, createBy } = currentRoute.value.query;
console.log("roomId", roomId);

import DPlayer from "dplayer";
import Flv from "flv.js"; //用于播放m3u8格式
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import { SOCKET_URL } from "/config.js";

const themeStore = useThemeStore();
const video = useTemplateRef("video");
// 聊天相关的状态
const messages = ref([
  { username: "帅气少年", content: "你好", timestamp: new Date() },
]);
const newMessage = ref("");
const username = ref(userStore.username);
const chatRoom = ref(null);
const options = ref([
  {
    label: "呼唤帅气小AI",
    value: "AI",
  },
  {
    label: "呼唤生图小AI",
    value: "生图",
  },
]);

// 视频相关的状态
const dp = ref(null);
const showPlayButton = ref(true);
const loadVideo = () => {
  dp.value = new DPlayer({
    container: document.getElementById("dplayer"),
    hotkey: true, //开启热键，支持快进、快退、音量控制、播放暂停
    preload: "auto", //视频预加载，可选值: 'none', 'metadata', 'auto'
    playbackSpeed: [0.5, 1, 2, 4, 8], //播放速度
    autoplay: true, // 尝试自动播放
    volume: 0, // 静音以支持自动播放
    video: {
      url: "https://web-1313109150.cos.ap-shanghai.myqcloud.com/videos/20241009_165304.mp4",
    },
  });

  dp.value.on("seeked", () => {
    console.log("seeked");
    handleSeek(dp.value.video.currentTime);
  });
  dp.value.on("pause", () => {
    console.log("pause");
    handlePause();
  });
  dp.value.on("playing", () => {
    console.log("playing");
    handlePlay();
  });

  // 每隔30秒发送一次视频控制消息
  // 每隔30秒发送一次视频控制消息
  if (userStore.userId === createBy) {
    setInterval(() => {
      handleSeek(dp.value.video.currentTime);
    }, 30000);
  }
};
const handleCancelMute = () => {
  dp.value.volume(0.5, true, false);
  showPlayButton.value = false;
};
const handlePlay = () => {
  handleSendVideoControl({
    action: "play",
    userId: userStore.userId,
    roomId,
  });
};
const handlePause = () => {
  handleSendVideoControl({
    action: "pause",
    userId: userStore.userId,
    roomId,
  });
};

const handleSeek = (currentTime) => {
  handleSendVideoControl({
    action: "seek",
    currentTime,
    userId: userStore.userId,
    roomId,
  });
};

const handleSendVideoControl = (data) => {
  if (userStore.userId !== createBy) {
    return;
  }
  console.log("发送视频指令", data.action);
  try {
    client.publish({
      destination: "/app/video.control",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("发送视频控制消息失败", err);
  }
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

// 视频相关的状态
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
    client.subscribe(`/topic/video/${roomId}`, (message) => {
      const videoData = JSON.parse(message.body);
      // 在此处理接收到的视频控制消息
      let isCurrentUser = videoData.userId === userStore.userId;
      console.log("isCurrentUser", isCurrentUser);
      if (!isCurrentUser) {
        if (videoData.action === "seek") {
          console.log("收到远端seek消息");
          dp.value.seek(videoData.currentTime);
        } else if (videoData.action === "pause" && !dp.value.video.paused) {
          console.log("收到远端暂停消息");
          dp.value.toggle();
        } else if (videoData.action === "play" && dp.value.video.paused) {
          console.log("收到远端播放消息");
          document.querySelector(".dplayer-video").play();
        }
      }

      console.log("消息", videoData);
    });

    // 订阅聊天主题
    client.subscribe(`/topic/chat/${roomId}`, (message) => {
      const chatData = JSON.parse(message.body);
      console.log("聊天消息", chatData);
      if (chatData.isAI) {
        const requestId = chatData.requestId;
        const chatMessage = document.getElementById(requestId);
        if (chatMessage) {
          if (chatMessage.innerText?.includes("AI 正在思考...")) {
            chatMessage.innerText = chatMessage.innerText.replace(
              "AI 正在思考...",
              chatData.content
            );
          } else {
            chatMessage.innerText += chatData.content;
          }
        } else {
          messages.value.push(chatData);
        }
      } else {
        messages.value.push(chatData);
      }
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

const handleEnterSend = (e) => {
  console.log("e", e);

  e.preventDefault();
  handleSend();
};
// 处理发送聊天消息
const handleSend = () => {
  if (!newMessage.value || newMessage.value.trim() === "") return;
  const isAI = newMessage.value.includes("@AI");

  const message = newMessage.value.replace("@AI", "").trim();
  if (!message) return;
  if (!roomId) {
    notification.error({
      content: "当前未进入房间",
      duration: 3000,
    });
    return;
  }
  if (!createBy) {
    notification.error({
      content: "当前房间已经失效",
      duration: 3000,
    });
    return;
  }
  const chatMessage = {
    username: username.value,
    content: message,
    isAI,
    timestamp: new Date(),
    roomId: roomId,
  };
  console.log("chatMessage", chatMessage);
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
