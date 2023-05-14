<template>
  <div class="container">
    <div style="display: flex; flex-direction: row">
      <el-card class="left-container"> </el-card>
      <el-card class="right-container">
        <div class="right_tip"></div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="Login" name="login">
            <Login />
          </el-tab-pane>
          <el-tab-pane label="Register" name="register"><Register /></el-tab-pane>
          <el-tab-pane label="Manage" name="manage"><Manage /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import type { FormInstance, FormRules, TabsPaneContext } from 'element-plus'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Manage from './components/Manage.vue'
// defineProps<{ msg: string }>()

const activeName = ref('login')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style scoped lang="less">
.left-container {
  background-image: url(../../assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 30px;
  overflow: hidden;
  transition: all ease-in-out 1s;
}

.left-container:hover {
  width: 200px;
}
.right-container {
  position: relative;
}
.right_tip {
  position: absolute;
  right: 0;
  top: 0;
  border: 24px rgba(0, 0, 0, 0) solid;
  border-top: 24px solid aqua;
  border-right: 24px solid aqua;
  transition: all ease-out 10s;
  transition-delay: 3s;
}
.right_tip:hover {
  border-width: 600px;
  transition: all ease-out 0.5s;
  transition-delay: 0s;

  // transform: translate(-30px);
}
.el-tab-pane {
  transition: all 1s ease-in-out;
}
</style>
