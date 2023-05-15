<template>
  <el-card class="right-card-container" body-style="height: 100%;padding: 0;display:flex;flex-direction:column;  ">
    <div class="right-top-card">
      <a href="#">sssss</a>
    </div>
    <el-card class="right-center-card" body-style="height:90%">
      <el-scrollbar class="msg-list">
        <div v-for="(item, index) in msgList" :key="index">
          <div class="msg-item-time">{{ item.created_at }}</div>
          <div class="msg-item">
            <div class="msg-item-img">
              <img src="@/assets/bg.jpg" />
              <i></i>
            </div>
            <div class="msg-item-right">
              <div class="msg-item-name">
                <span>{{ item.nickname }}</span>
                <span>
                  <a href="#">({{ item.sender_id }})</a></span
                >
              </div>

              <div class="msg-item-content">
                <!-- text(文本),image(图片),video(视频),file(文件) -->
                <div v-if="item.type === 'text'">{{ item.content }}</div>
                <el-image
                  v-if="item.type === 'image'"
                  :alt="getUrl(item.content)"
                  style="height: 100px"
                  :src="item.content"
                  fit="contain"
                />
                <div v-if="item.type == 'video'">
                  <!-- <video :src="getUrl(item.content)"   -->
                  <video src="@/assets/video1.mp4" muted style="height: 150px; object-fit: cover"></video>
                  <div class="play-btn">
                    <el-icon v-if="index === currentIndex" size="32" @click="endPlayVideo(index, item.content)"><VideoPause /></el-icon>
                    <el-icon @click="playVideo(index, item.content)" v-else size="32"><VideoPlay /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
    <el-card class="right-bottom-card" :style="{ height: showBottom ? '150px' : '0' }">
      <div class="hide-bittom-btn">
        <el-icon v-show="!showBottom" size="32" @click="showBottom = true"><ArrowUp /></el-icon>
        <el-icon v-show="showBottom" size="32" @click="showBottom = false"><ArrowDown /></el-icon>
      </div>

      <div class="function-line">
        <el-popover  placement="top-end" trigger="click" :width="500">
          <div class="emoji-list"  @click.stop="">
            <span  class="emoji-list-item" v-for="(item, index) in EmojiList" :key="index" @click.stop="addEmoji(item)">{{ item }}</span>
          </div>
          <template #reference>
            <el-icon size="26"><Eleme /></el-icon>
          </template>
        </el-popover>

        <el-icon size="26"><Scissor /></el-icon>
        <el-icon size="26"><PictureRounded /></el-icon>
        <el-icon size="26"><Folder /></el-icon>
        <el-icon size="26"><Phone /></el-icon>
        <el-icon size="26"><VideoCamera /></el-icon>
        <el-icon size="26"><Camera /></el-icon>
        <!-- <el-icon size="26"><Microphone /></el-icon> -->
      </div>

      <el-input
        v-model="textarea"
        maxlength="300"
        input-style=" font-size: 18px;"
        show-word-limit
        resize="none"
        :autosize="{ minRows: 2, maxRows: 3 }"
        type="textarea"
        placeholder="Please input"
      />
      <el-button type="primary" :loading="false" size="large" class="submit-btn">
        <template #loading>
          <div class="custom-loading">
            <svg class="circular" viewBox="-10, -10, 50, 50">
              <path
                class="path"
                d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
                style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
              />
            </svg>
          </div>
        </template>
        submit
      </el-button>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
// import { defineEmits } from "vue"
// 对应写法一
// const emit = defineEmits(['toSettings', 'toLink'])
import { EmojiList } from '@/utils/emoji'
const showEmoji = ref(true)
const addEmoji = item => {}
import { reactive, ref, toRaw } from 'vue'
let activeName = ref('chat')
let expandSetting = ref(false)

let showBottom = ref(true)
let textarea = ref('')

const msg = {
  sender_id: 12,
  receiver_id: 10,
  nickname: 'nicknamssssssssssssssssssssssssdddddddddddddddddddddddssssssssse',
  content: 'csss🤔ssss sssssssssssssssssssssssssssssssssssssssssssssssssssnt',
  room: 'roomid',
  avatar: '@/assets/bg.jpg',
  type: 'text',
  file_size: 0,
  created_at: '12:10'
}
const msg2 = {
  sender_id: 12,
  receiver_id: 10,
  nickname: 'nickname',
  content: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  room: 'roomid',
  avatar: '@/assets/bg.jpg',
  type: 'image',
  file_size: 0,
  created_at: '12:10'
}
const msgList = [msg, msg2, msg, msg, msg]
const getUrl = str => {
  return str
}
let showVideoDialog = ref(false)
let currentVideo = ref('')
let currentIndex = ref(-1)
const playVideo = (index, content) => {
  currentIndex.value = index
  showVideoDialog.value = true
  currentVideo = getUrl(content)
}
const endPlayVideo = (index, content) => {
  currentIndex.value = -1
  showVideoDialog.value = false
  currentVideo.value = ''
}

const toSettings = index => {
  // emit('toSettings', index)
}
</script>
<style scoped lang="less">
.el-card {
  background-color: #f5f6f7;
}
.right-card-container {
  background-color: #f5f6f7;
  flex: 1;
}

.right-top-card {
  padding-left: 30px;
  text-align: start;
  font-size: 30px;
  height: 50px;
  width: 100%;
}
.right-center-card {
  flex: 1;
  width: 100%;
  .msg-list {
    height: 100%;
  }
  .msg-item-time {
    text-align: center;
    font-size: 12px;
    color: gray;
    display: block;
  }
  .msg-item {
    display: flex;
    min-height: 60px;

    margin-bottom: 2px;
    position: relative;
  }

  .msg-item-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .msg-item-right {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    text-align: left;
  }
  .msg-item-name {
    span {
      display: inline-block;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .msg-item-content {
    width: fit-content;
    border-radius: 5px;
    word-break: break-all;
    background-color: white;
    padding: 5px;
    position: relative;
  }
}

.right-bottom-card {
  transition: height ease-in-out 0.5s;
  position: relative;
  width: 100%;
  height: 150px;
  overflow: visible;
  .hide-bittom-btn {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    transition: all ease-in-out 0.5s;
  }
  .hide-bittom-btn:hover {
    top: -40px;
  }
  .function-line {
    text-align: start;
    .el-icon {
      margin-right: 15px;
    }
  }
  .submit-btn {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}

.emoji-list {
  display: flex;
  flex-wrap: wrap;
  user-select:none;
  
  font-size: 24px;
  .emoji-list-item {
       transition:all 0.6s ease-out;
       
   }
  .emoji-list-item:hover{
       
      transform:scale(2.5);
  }
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}

.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>
