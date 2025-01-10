import { baseAxios } from '@/axios/base'

function register(data) {
  return baseAxios.post('/register', data)
}

export { register }
