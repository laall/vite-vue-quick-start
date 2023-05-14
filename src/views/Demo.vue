<template>
    <div class="container">
        <div v-once>ref: {{ a_ref }}</div>
        <div :style="style">shallowRef: {{ a_shallowRef }}</div>
        <button @[event].stop="clickFunc">change ref</button>
        <button @[event].stop="clickFunc2">change shallowRef</button>
    </div>
</template>

<script setup lang="ts">
import { ref, isRef, shallowRef, triggerRef, onBeforeMount, onMounted } from 'vue'
import type { Ref } from 'vue'
const event: string = 'click'
type Man = {
    name: string
}
let a_ref: Ref<Man> = ref({ name: 'b' })
// let a_ref: Ref<string> = ref( 'b' )
let a_shallowRef: Ref<Man> = shallowRef({ name: 'b' })
const clickFunc = () => {
    a_ref.value.name += 1
    console.log('isRef(a_ref): ', isRef(a_ref))
    console.log('isRef(b): ', isRef('b'))
    a_shallowRef.value = { name: 'a_shallowRef' } // 响应
}
const clickFunc2 = () => {
    a_shallowRef.value.name = 'a_shallowRef22'
    // triggerRef(a_shallowRef) //强制更新页面DOM
    // 不与ref混用时 值会变,但不会渲染
    // 混用时 值会变,会渲染(ref渲染时 shallowRef会被受影响,调用triggerRef)
}

type Style = {
    height: string
    color: string
}

const style: Style = {
    height: '50px',
    color: 'blue'
}

// const data = reactive({})
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<style scoped lang="less"></style>
