<template>
  <div class="container">
    <el-form label-width="0" v-verify="ruleForm.verify" ref="ruleFormRef" :model="ruleForm" status-icon>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email" verify="email, required" placeholder="email" type="email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input
          v-model="ruleForm.username"
          verify="required"
          placeholder="username"
          type="text"
          minlength="3"
          maxlength="15"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="ruleForm.password" verify="password, required " placeholder="new password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="submit">
        <el-button type="primary" @click="submitForm(ruleFormRef)">Register</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { forgetPassword } from '@/api/auth/auth'
import { getLoginUser, removeLoginUser, setLoginUser } from '@/utils/local_'
// 在组件中的state中的verify就是组件级别的配置可以覆写全局配置
import type { VerifyOptions as Verify, Valid } from 'vue-best-verify'

const store = useStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  email: '',
  verify: {} as Verify
})
onMounted(async () => {})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if (ruleForm.verify.do_verify()) {
    console.log('验证成功')
    const { username, email, password } = toRaw(ruleForm)
    forgetPassword({ username, email, password }).then(data => {
      loginUser({ username, password }).then(data => {
        setLoginUser({ username, password })
        store.dispatch('Login', data)
        router.push('/index')
      })
    })
  } else {
    console.log('error submit!')
  }
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // formEl.resetFields()
  ruleForm.verify.do_reset()
}
</script>
<style scoped lang="less">
.container {
  resize: both;
}
</style>
