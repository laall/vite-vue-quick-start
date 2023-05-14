const TokenKey = 'Authorization'
const LoginKey = 'login'
const NameKey = 'user'
const IPAddressKey = 'ipaddress'
const ProxyAddressKey = 'proxyaddress'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getLoginUser() {
  if (localStorage.getItem(LoginKey)) {
    return JSON.parse(localStorage.getItem(LoginKey))
  }
  return ''
}
export function setLoginUser(user) {
  return localStorage.setItem(LoginKey, JSON.stringify(user))
}
export function removeLoginUser() {
  return localStorage.removeItem(LoginKey)
}

export function getUser() {
  if (localStorage.getItem(NameKey)) {
    return JSON.parse(localStorage.getItem(NameKey))
  }
  return ''
}
export function setUser(user) {
  return localStorage.setItem(NameKey, JSON.stringify(user))
}

export function removeUser() {
  return localStorage.removeItem(NameKey)
}
export function getIPaddress() {
  return localStorage.getItem(IPAddressKey)
}

export function setIPaddress(ipaddress) {
  return localStorage.setItem(IPAddressKey, ipaddress)
}

export function removeIPaddress() {
  return localStorage.removeItem(IPAddressKey)
}

export function getProxyaddress() {
  return localStorage.getItem(ProxyAddressKey)
}

export function setProxyaddress(proxyaddress) {
  return localStorage.setItem(ProxyAddressKey, proxyaddress)
}

export function removeProxyaddress() {
  return localStorage.removeItem(ProxyAddressKey)
}
