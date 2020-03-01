import axios from '@/libs/request'
import qs from 'qs'

// 获取用户列表

const getUserList = (params) =>
  axios.get('/admin/users?' + qs.stringify(params))

export { getUserList }
