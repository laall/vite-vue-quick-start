<template>
    <div>
        <table style="width: 800px" border>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>数量</th>
                    <th>价格</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(item, index) in data">
                    <td align="center">{{ item.name }}</td>
                    <td align="center">
                        <button @click="AddAnbSub(item, false)">-</button>
                        {{ item.num }}
                        <button @click="AddAnbSub(item, true)">+</button>
                    </td>
                    <td align="center">{{ item.num * item.price }}</td>
                    <td align="center">
                        <button @click="del(index)">删除</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td align="center">总价:{{ $total }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
type Shop = {
    name: string
    num: number
    price: number
}

const data = reactive<Shop[]>([
    {
        name: '小满的袜子',
        num: 1,
        price: 100
    },
    {
        name: '小满的裤子',
        num: 1,
        price: 200
    },
    {
        name: '小满的衣服',
        num: 1,
        price: 300
    },
    {
        name: '小满的毛巾',
        num: 1,
        price: 400
    }
])

const AddAnbSub = (item: Shop, type: boolean = false): void => {
    if (item.num > 1 && !type) {
        item.num--
    }
    if (item.num <= 99 && type) {
        item.num++
    }
}
const del = (index: number) => {
    data.splice(index, 1)
}
let $total = computed<number>(() => {
    return data.reduce((prev, next) => {
        return prev + next.num * next.price
    }, 0)
})
</script>

<style></style>
