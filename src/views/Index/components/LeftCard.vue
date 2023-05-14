<template>
  <el-card class="left-card-container" body-style="display:flex;flex-direction:column;align-items: center;  ">
    <div @click="emit('toLink', 'userinfo')" class="left-card-container-img"><img src="@/assets/bg.jpg" /></div>
    <div class="left-card-container-img-bg"></div>
    <br />
    <br />
    <el-tabs tab-position="right" v-model="activeName" type="card" @tab-click="emit('toLink', activeName)">
      <el-tab-pane name="chat">
        <template #label>
          <el-icon size="26"><ChatRound /></el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane name="friend">
        <template #label>
          <el-icon size="26"><User /></el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane name="file">
        <template #label>
          <el-icon size="26"><Files /></el-icon>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-popover
      @show="expandSetting = true"
      @hide="expandSetting = false"
      placement="right-end"
      :auto-close="300"
      :width="150"
      trigger="click"
    >
      <template #reference>
        <el-icon size="32" class="settings-icon"><Expand v-show="!expandSetting" /><Fold v-show="expandSetting" /></el-icon>
      </template>
      <el-menu @select="toSettings">
        <el-menu-item index="Help">
          <el-icon><Help /></el-icon>
          <template #title>Help</template>
        </el-menu-item>
        <el-menu-item index="Theme">
          <el-icon><Sunny /></el-icon>
          <el-icon v-if="false"><Moon /></el-icon>
          <el-icon v-if="false"><MagicStick /></el-icon>
          <template #title>Theme</template>
        </el-menu-item>
        <el-menu-item index="Settings">
          <el-icon><setting /></el-icon>
          <template #title>Settings</template>
        </el-menu-item>
        <el-menu-item index="Logout">
          <el-icon><Close /></el-icon>
          <template #title>Logout</template>
        </el-menu-item>
      </el-menu>
    </el-popover>
  </el-card>
</template>
<script setup lang="ts">
// import { defineEmits } from "vue"
// 对应写法一
const emit = defineEmits(['toSettings', 'toLink'])

import { reactive, ref, toRaw } from 'vue'
let activeName = ref('chat')
let expandSetting = ref(false)
const toSettings = index => {
  emit('toSettings', index)
}
</script>
<style scoped lang="less">
.left-card-container {
  width: 70px;
  .left-card-container-img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    z-index: 2;
    img {
      // object-fit: contain;
      // fill|contain|cover|scale-down|none|initial|inherit; scale-down
      width: 50px;
      height: 50px;
    }
  }

  .left-card-container-img-bg {
    position: absolute;
    top: 16px;
    left: 6px;
    z-index: 1;
    border-radius: 50%;
    background: radial-gradient(circle at top left, #ff7f00, #ff0080, #a70cff, #00bfff, #1aff1a);
    width: 60px;
    height: 60px;
    transition: all 10s ease-in-out;
  }
  .left-card-container-img:hover + .left-card-container-img-bg {
    transform: rotate(36000deg);
  }
  .settings-icon {
    position: absolute;
    bottom: 20px;
  }
}
</style>
