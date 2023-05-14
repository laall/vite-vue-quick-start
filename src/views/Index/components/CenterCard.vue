<template>
  <el-card class="right-card-container" body-style="display:flex;flex-direction:column;align-items: center;  ">
    <el-row :gutter="12" type="flex" justify="center" align="middle">
      <el-col :span="20"><el-input type="search" /></el-col>
      <el-col :span="4" style="display: inline-flex; color: #d7dae0">
        <el-icon size="26"><Plus /></el-icon
      ></el-col>
    </el-row>
    <el-divider style="margin-top: 16px; margin-bottom: 0px" />
    <div class="showList">
      <div v-for="(item, index) in chatList" key="index">
        <div class="chat-item">
          <!-- <div v-if="item.user_id" class="chat-item"> -->
          <div class="chat-item-left">
            <div class="chat-item-img">
              <img src="@/assets/bg.jpg" />
              <i></i>
            </div>
            <div class="chat-item-content">
              <div class="chat-item-name">{{ item.name }}</div>
              <div class="chat-item-msg">{{ item.lastMessage }}</div>
            </div>
          </div>
          <div class="chat-item-time">
            {{ item.updated_at }}
          </div>
        </div>
        <!-- <div v-if="item.group_id" class="chat-item">cccxxx</div> -->
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
// import { defineEmits } from "vue"
// 对应写法一
const emit = defineEmits(['toLink'])

import { reactive, ref, toRaw } from 'vue'
let activeName = ref('chat')
const toLink = index => {
  emit('toLink', index)
}

// avatar,lastMessage(最后一条消息),name,room,type,
// unreadCount(当前用户未读的消息数量)
//,updated_at,group_id(分组id)

const chatList = [
  {
    name: '大学少时诵诗书所所所所所所所',
    avatar: '',
    updated_at: '12:10',
    lastMessage: 'aaaaaa大学少时诵诗书所所所所',
    room: '',
    user_id: 1,
    group_id: null,
    unreadCount: 12,
    type: 'text'
  },
  {
    name: '大学少时诵诗书所所所所所所所',
    avatar: '',
    updated_at: '213',
    lastMessage: 'aaaaaa大学少时诵诗书所所所所',
    room: '',
    user_id: null,
    group_id: 1,
    unreadCount: 12,
    type: 'text'
  }
]
</script>
<style scoped lang="less">
.right-card-container {
  width: 240px;
  height: 500px;
  padding: 0;
}
.showList {
  width: 240px;
  height: 430px;
  .chat-item {
    margin-bottom: 1px;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    height: 70px;
    border-bottom: 1px solid #eee;
  }
  .chat-item:hover {
    background-color: #eee;
  }
}
.chat-item-time {
  width: 50px;
}
.chat-item-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 50px;
    height: 50px;
  }
}
.chat-item-left {
  flex: 1;
  display: flex;
  .chat-item-content {
    font-size: 16px;
    margin-left: 10px;
    width: 120px;

    .chat-item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chat-item-msg {
      font-size: 14px;
      color: rgb(151, 144, 144);
      width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
