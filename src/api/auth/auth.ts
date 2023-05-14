import http from '@/api/request'

async function loginUser(info: any) {
  const res = await http.post<{}>('/auth/login', info)
  return res
}
async function registerUser(info: any) {
  const res = await http.post<{}>('/auth/register', info)
  return res
}
async function forgetPassword(info: any) {
  const res = await http.post<{}>('/auth/password/forget', info)
  return res
}
async function getCaptcha() {
  const res: { data: string; text: string } = await http.get('/auth/captcha')
  return res
}

export { loginUser, getCaptcha, registerUser, forgetPassword }
