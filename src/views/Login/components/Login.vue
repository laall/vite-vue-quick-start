<template>
  <div class="container">
    <el-form label-position="top" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="username / email" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha-container">
          <el-input
            maxlength="4"
            @keyup.enter.native="submitLoginForm(ruleFormRef)"
            v-model="ruleForm.captcha"
            placeholder="captcha"
            type="text"
            autocomplete="off"
          />
        </div>
        <div
          @click="changeCaptcha"
          v-html="captchaSrc.data"
          style="display: inline-block; align-items: center; height: 40px; margin-left: 20px"
        ></div>
      </el-form-item>
      <!-- <el-form-item prop="config">
        <el-checkbox-group v-model="ruleForm.config">
          <el-checkbox label="Remember Me" name="config" checked />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitLoginForm(ruleFormRef)">Login</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        <!-- <a style="margin-left: 10px; user-select: none" @click="">forget password?</a> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, onMounted } from 'vue'
import type { FormInstance, FormRules, TabsPaneContext } from 'element-plus'
import { loginUser, getCaptcha } from '@/api/auth/auth'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getLoginUser, removeLoginUser, setLoginUser } from '@/utils/local_'
const store = useStore()
const router = useRouter()
const captchaSrc = ref({ data: '', text: '' })
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  captcha: '',
  config: ['Remember Me']
})
onMounted(async () => {
  let loginUser = getLoginUser()
  if (loginUser) {
    ruleForm.username = loginUser.username
    ruleForm.password = loginUser.password
  }
  captchaSrc.value = await getCaptcha()
})
const changeCaptcha = async () => {
  captchaSrc.value = await getCaptcha()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const validateCaptcha = (rule: any, value: string, callback: any) => {
  if (value === '') return callback(new Error('Input the captcha'))
  if (value.toUpperCase() !== captchaSrc.value.text.toUpperCase()) return callback(new Error('wrong captcha'))
  callback()
}
const rules = reactive<FormRules>({
  username: [
    {
      validator: (rule: any, value: any, callback: any) => {
        value === '' ? callback(new Error('Please input the username')) : callback()
      },
      trigger: 'blur'
    },
    { min: 3, max: 15, trigger: 'blur', message: '3 to 15 words' }
  ],
  password: [
    { validator: validatePass, trigger: 'blur' },
    { min: 6, max: 15, trigger: 'blur', message: '6 to 15 words' }
  ],
  captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
})

const submitLoginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      const { username, password, config } = toRaw(ruleForm)
      // if (config.indexOf('Remember Me') === -1) {
      //   removeLoginUser()
      // }
      loginUser({ username, password }).then(data => {
        // if (config.indexOf('Remember Me') !== -1) {
        setLoginUser({ username, password })
        // }
        store.dispatch('Login', data)
        router.push('/index')
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped lang="less">
.captcha-container {
  width: 100px;
}
</style>
