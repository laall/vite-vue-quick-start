<template>
    <div class="container">USER</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
    name: '',
    props: [],
    // emits: ['hello]
    setup(props, context) {
        console.log('1-开始创建组件-setup')
        console.log(props, context)
        // function test() { context.emit('hello') }
        const data = reactive({})
        onBeforeMount(() => {
            console.log('2.组件挂载页面之前执行----onBeforeMount')
        })
        onMounted(() => {
            console.log('3.-组件挂载到页面之后执行-------onMounted')
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>
<style scoped lang="less"></style>
