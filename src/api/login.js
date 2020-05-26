import { axios } from '@/libs/request'

/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 * 找回密码接口
 * @param {*} option 用户信息（邮箱，验证码）
 */
const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

/**
 * 登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = (loginInfo) => {
  loginInfo.password = btoa(loginInfo.password)
  return axios.post('/admin/login', {
    ...loginInfo
  })
}

/**
 * 注册接口
 * @param {*} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/admin/register', {
    ...regInfo
  })
}

/**
 * 重置密码接口
 * @param {*} info 重置密码信息
 */
const reset = (info) => axios.post('/reset/password', { ...info })

export { getCode, forget, login, reg, reset }
