<template>
  <el-card :style="size[mainWindowSize]" class="home-container" body-style="padding:0;display:flex; position: relative;height:100%">
    <left-card @toLink="handleLinkChange" @toSettings="handleSettings" />
    <center-card @toLink="handleLinkChange"> </center-card>
    <!-- <el-divider class="center-right-divider" border-style="solid;" direction="vertical"></el-divider> -->
    <right-card></right-card>
    <div class="right-top-tips">
      <el-icon @click="mainWindowSize = 'min'" size="20" class="sys-icon">
        <Minus />
      </el-icon>
      <el-icon v-if="mainWindowSize == 'max'" @click="mainWindowSize = 'normal'" size="20" class="sys-icon"><CopyDocument /></el-icon>
      <el-icon v-else @click="mainWindowSize = 'max'" size="20" class="sys-icon">
        <FullScreen />
      </el-icon>

      <el-icon size="20" class="exit-icon"> <Close /> </el-icon>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import type { Ref } from 'vue'
import LeftCard from './components/LeftCard.vue'
import CenterCard from './components/CenterCard.vue'
import RightCard from './components/RightCard.vue'

const mainWindowSize: Ref<'max' | 'normal' | 'min'> = ref('normal')
const size = {
  max: { width: '98vw', height: '97vh' },
  normal: { width: '800px', height: '600px' },
  min: { width: '0', height: '0' }
}

const handleSettings = index => {
  console.log(index)
  switch (index) {
    case 'Help':
      console.log(index)
      break
    case 'Theme':
      console.log(index)
      break
    case 'Settings':
      console.log(index)
      break
    case 'Logout':
      console.log(index)
      break
  }
}

const handleLinkChange = index => {
  console.log(index)
  switch (index) {
    case 'userinfo':
      console.log(index)
      break
    case 'chat':
      console.log(index)
      break
    case 'friend':
      console.log(index)
      break
    case 'file':
      console.log(index)
      break
  }
}
</script>
<style scoped lang="less">
.home-container {
  .el-card {
    height: 100%;
  }
  // .center-right-divider {
  //   height: 100%;
  //   margin: 0;
  //   padding: 0 1px;
  // }
  // .center-right-divider:hover {
  //   // pointer-events: none;
  //   cursor: w-resize;
  //   background-color: red;
  // }
}

.right-top-tips {
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  user-select: none;
  background-color: #eee;
  overflow: hidden;

  .sys-icon {
    margin: 10px;
    :hover {
      background-color: #d0d2d5;
      box-shadow: 0 0 5px 10px #d0d2d5;
    }
  }
  .exit-icon {
    margin: 10px;
    :hover {
      color: white;
      background-color: red;
      box-shadow: 0 0 5px 10px red;
    }
  }
}
</style>
