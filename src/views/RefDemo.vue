<template>
    <div ref="div">小满Ref</div>
    <hr />
    <div>
        {{ name }}
    </div>
    <hr />
    <button @click="change">修改 customRef</button>
    <div ref="dom">我是DOM</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, shallowRef, customRef } from 'vue'
const dom = ref<HTMLDivElement>()
// 此时dom未渲染
// console.log(dom.value?.innerText)

function myRef<T = any>(value: T) {
    let timer: any
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newVal) {
                // 防抖
                clearTimeout(timer)
                timer = setTimeout(() => {
                    console.log('触发了set')
                    value = newVal
                    trigger()
                }, 500)
            }
        }
    })
}

const name = myRef<string>('小满')

const change = () => {
    name.value = '大满'
    console.log(dom.value?.innerText)
}
</script>
<style scoped></style>
