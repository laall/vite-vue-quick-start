import http from '@/api/request'

export async function getCronRunResult(cronValue: string) {
  const res = await http.post<{}>('/cron/getRunResult', { cron: cronValue })
  return res
}

/*
在vue页面中如何使用

import { getCronRunResult } from "@/http/api"

let resultList = ref([])
const centerDialogVisible = ref(false)
function run(){
  console.log("--run--");
  getCronRunResult(newCronValue.value).then((res:any)=>{
    resultList.value = res;
    centerDialogVisible.value = true;
  }).catch((err:any)=>{
    console.log("--err--"+ err);
  })
}

//template 引用
 <el-text v-for="item in resultList" >{{ item }}<br/></el-text>
 */
