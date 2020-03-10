import axios from '@/libs/request'
import qs from 'qs'

// 获取用户列表

const getUserList = (params) =>
  axios.get('/admin/users?' + qs.stringify(params))

const updateUserById = (data) => axios.post('/admin/update-user', data)

const updateUserBatchById = (data) =>
  axios.post('/admin/update-user-settings', data)

const deleteUserById = (ids) => axios.post('/admin/delete-user', { ids })

const checkUsername = (username) =>
  axios.get('/admin/checkname?username=' + username)

const addUser = (data) => axios.post('/admin/add-user', data)

const addMenu = (data) => axios.post('/admin/add-menu', data)

const getMenu = () => axios.get('/admin/get-menu')

const updateMenu = (data) => axios.post('/admin/update-menu', data)

const deleteMenu = (data) => axios.post('/admin/delete-menu', data)

export {
  getUserList,
  updateUserById,
  updateUserBatchById,
  deleteUserById,
  checkUsername,
  addUser,
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu
}
