<template>
  <el-card class="right-card-container " body-style="display:flex;flex-direction:column;align-items: center;  ">
    xx
  </el-card>
</template>
<script setup lang="ts">
// import { defineEmits } from "vue"
// 对应写法一
// const emit = defineEmits(['toSettings', 'toLink'])

import { reactive, ref, toRaw } from 'vue'
let activeName = ref('chat')
let expandSetting = ref(false)
const toSettings = index => {
  emit('toSettings', index)
}
</script>
<style scoped lang="less">
.right-card-container {

    flex: 1;
  
 }
</style>
