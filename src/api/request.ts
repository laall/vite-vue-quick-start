import { ElMessage } from 'element-plus'
// // 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//配置中心
import webConfig from '@/global.config.js'
import router from '@/router'
import axios from 'axios'
import store from '@/store/index'

const service = axios.create({
  baseURL: 'http://127.0.0.1:9000', //  import.meta.env.BASE_URL
  timeout: 3000,
  withCredentials: false,
  responseType: 'json'
})

// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    NProgress.start()
    let whiteList = webConfig.whiteListApi
    let token = store.getters['token']
    if (whiteList.indexOf(config.url) === -1 && token) {
      config.headers['authorization'] = token
    }
    // let _secret = md4.encode(webConfig.secretId + new Date().toString());
    // config.headers.secret = _secret;
    return config
  },
  (error: any) => {
    // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    NProgress.done()
    if (res.code !== 200) {
      ElMessage.error(res.message)
      if (res.code === 401) {
        // todo: vuex+localstorage清除用户信息
        // this.$store.push('/')
        store.dispatch('Logout')
        router.push({ path: '/login' })
      }
      return Promise.reject(res.message)
    } else {
      ElMessage.success(res.message)
    }
    if (res.data.token) {
      store.commit('SET_TOKEN', res.data.token)
    }
    return Promise.resolve(response.data.data)
  },
  (error: any) => {
    NProgress.done()

    if (error.request) {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    if (error.response) {
      switch (error.response.status) {
        case 500:
          ElMessage({
            message: '服务器错误，请稍后重试',
            type: 'error',
            duration: 5 * 1000
          })
          break
        default:
          ElMessage({
            message: error.messages,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
      }
    }
    Promise.reject(error)
  }
)

interface IHttp {
  get<T>(url: string, params?: unknown): Promise<T>
  post<T>(url: string, params?: unknown): Promise<T>
}

const http: IHttp = {
  get(url: string, params?: unknown) {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  post(url: string, params?: unknown) {
    return new Promise((resolve, reject) => {
      service
        .post(url, params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
}

// export { http, service as request }
export default http
