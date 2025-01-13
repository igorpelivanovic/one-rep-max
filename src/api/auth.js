import { authAxios } from '@/axios/auth'
import { baseAxios } from '@/axios/base'

function login(data) {
  return baseAxios.post('/login', data)
}

function logout() {
  return authAxios.post('/logout')
}

function register(data) {
  return baseAxios.post('/register', data)
}

function userData() {
  return authAxios.get('/me')
}

export default { login, logout, userData, register }
