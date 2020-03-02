import axios from '@/libs/request'
import qs from 'qs'

// 获取用户列表

const getUserList = (params) =>
  axios.get('/admin/users?' + qs.stringify(params))

const updateUserById = (data) => axios.post('/admin/update-user', data)

const deleteUserById = (id) => axios.get('/admin/delete-user?id=' + id)

const checkUsername = (username) => axios.get('/admin/checkname?username=' + username)

export {
  getUserList,
  updateUserById,
  deleteUserById,
  checkUsername
}
