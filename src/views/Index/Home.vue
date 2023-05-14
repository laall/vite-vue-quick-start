<template>
  <div class="container">
    <el-card class="home-container" body-style="padding:0;margin:0;display:flex; position: relative;">
      <left-card @toLink="handleLinkChange" @toSettings="handleSettings" />
      <center-card @toLink="handleLinkChange">xx </center-card>
      <right-card>xx</right-card>
      <div class="right-top-tips">
        <el-icon size="20" class="sys-icon"> <Minus /> </el-icon>
        <el-icon size="20" class="sys-icon"> <FullScreen /> </el-icon>
        <el-icon size="20" class="exit-icon"> <Close /> </el-icon>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import LeftCard from './components/LeftCard.vue'
import CenterCard from './components/CenterCard.vue'
import RightCard from './components/RightCard.vue'

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
  width: 800px;
  height: 500px;

  .el-card {
    height: 500px;
    resize: both;
  }
}
.right-top-tips {
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
