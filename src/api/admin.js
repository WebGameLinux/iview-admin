import { axios } from '@/libs/request'
import Dispatch from '../libs/dispatch'

// 获取用户列表
// const getUserList = (params) => axios.get('/admin/users?' + qs.stringify(params))
// const updateUserById = (data) => axios.post('/admin/update-user', data)
// const updateUserBatchById = (data) => axios.post('/admin/update-user-settings', data)
// const deleteUserById = (ids) => axios.post('/admin/delete-user', { ids })
// const checkUsername = (username) => axios.get('/admin/checkname?username=' + username)
// const addUser = (data) => axios.post('/admin/add-user', data)
export const userDispatch = new Dispatch({
  get: ['/admin/users', 'get'],
  update: ['/admin/update-user', 'post'],
  batch: ['/admin/update-user-settings', 'post'],
  delete: ['/admin/delete-user', 'post'],
  check: ['/admin/checkname', 'get'],
  add: ['/admin/add-user', 'post']
})

// const addMenu = (data) => axios.post('/admin/add-menu', data)
// const getMenu = () => axios.get('/admin/get-menu')
// const updateMenu = (data) => axios.post('/admin/update-menu', data)
// const deleteMenu = (data) => axios.post('/admin/delete-menu', data)
export const menuDispatch = new Dispatch({
  add: ['/admin/add-user', 'post'],
  get: ['/admin/get-menu', 'get'],
  update: ['/admin/update-menu', 'post'],
  delete: ['/admin/delete-menu', 'post']
})

// const addRole = (data) => axios.post('/admin/add-role', data)
// const getRoles = () => axios.get('/admin/get-roles')
// const getRoleNames = () => axios.get('/admin/get-roles-names')
// const updateRole = (data) => axios.post('/admin/update-role', data)
// const deleteRole = (data) => axios.post('/admin/delete-role', data)
export const roleDispatch = new Dispatch({
  add: ['/admin/add-role', 'post'],
  get: ['/admin/get-roles', 'get'],
  roles: ['/admin/get-roles-names', 'get'],
  update: ['/admin/update-role', 'post'],
  delete: ['/admin/delete-role', 'post']
})

// const getErrorList = (params) =>
//   axios.get('/admin/get-error?' + qs.stringify(params))
// const deleteErrors = (data) => axios.post('/admin/delete-error', data)
export const errorDispatch = new Dispatch({
  get: ['/admin/get-error', 'get'],
  delete: ['/admin/delete-error', 'post']
})

// 封装一层，更加简练
export const commentsDispatch = new Dispatch({
  get: ['/admin/get-comments', 'get'],
  update: ['/admin/update-comments', 'post'],
  batch: ['/admin/update-comments-batch', 'post'],
  delete: ['/admin/delete-comments', 'post']
})

export const getStatData = () => axios.get('/admin/getstat')
