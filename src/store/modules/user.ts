import {
  getUser,
  setUser,
  removeUser,
  getToken,
  setToken,
  removeToken,
  getIPaddress,
  setIPaddress,
  getProxyaddress,
  setProxyaddress
} from '@/utils/local_'
const user = {
  state: {
    token: getToken() ? getToken() : '',
    userInfo: getUser() ? getUser() : {},
    ipaddress: getIPaddress() ? getIPaddress() : 'https://127.0.0.1:8888',
    proxyaddress: getProxyaddress() ? getProxyaddress() : ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.userInfo = user
    },
    SET_IPADDRESS: (state, ipaddress) => {
      state.ipaddress = ipaddress
    },
    SET_PROXYADDRESS: (state, proxyaddress) => {
      state.proxyaddress = proxyaddress
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      commit('SET_TOKEN', userInfo.token)
      commit('SET_USER', userInfo.info)
      setToken(userInfo.token)
      setUser(userInfo.info)
    },
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        removeToken()
        removeUser()
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        window.localStorage.removeItem('auto_login')
        window.localStorage.removeItem('remember_password')
        window.localStorage.removeItem('last_password')
        resolve('')
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        removeToken()
        removeUser()
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        window.localStorage.removeItem('auto_login')
        window.localStorage.removeItem('remember_password')
        window.localStorage.removeItem('last_password')
        resolve('')
      })
    },
    //修改信息
    updateUserInfo({ commit }, userInfo) {
      commit('SET_USER', userInfo)
      setUser(userInfo)
    },
    //修改服务器地址
    updateAddress({ commit }, { ipaddress, proxyaddress }) {
      commit('SET_IPADDRESS', ipaddress)
      commit('SET_PROXYADDRESS', proxyaddress)
      setIPaddress(ipaddress)
      setProxyaddress(proxyaddress)
    }
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo,
    ipaddress: state => state.ipaddress,
    proxyaddress: state => state.proxyaddress
  }
}
export default user
