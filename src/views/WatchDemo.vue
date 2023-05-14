<template>
    <div class="container">
        <input type="text" v-model="message" />
        <input type="text" v-model="message2" />
        <input type="text" v-model="message3" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, toRef } from 'vue'

let message = ref('')
let message2 = ref('')

watch([message, message2], (newVal, oldVal) => {
    console.log('新的值----', newVal)
    console.log('旧的值----', oldVal)
})

// 使用reactive监听深层对象开启和不开启deep 效果一样

let message3 = reactive({
    nav: {
        bar: {
            name: ''
        }
    }
})

watch(
    message3,
    (newVal, oldVal) => {
        console.log('新的值----', newVal)
        console.log('旧的值----', oldVal)
    },
    { deep: true } //监听深层对象
)
watch(
    // message3.nav.bar.name,// 无法监听string
    // toRef(message3.nav.bar.name),
    () => message3.nav.bar.name,
    (newVal, oldVal) => {
        console.log('新的值----', newVal)
        console.log('旧的值----', oldVal)
    },
    {
        deep: true, // 监听深层对象
        immediate: true, // 是否初始时就立即执行一次
        flush: 'pre' // pre 组件更新就调用  sync 组件更新同步执行 post 组件更新之后执行
    }
)
</script>
<style scoped lang="less"></style>
