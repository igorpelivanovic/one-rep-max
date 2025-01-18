import { authAxios } from '@/axios/auth'
function add(data) {
  return authAxios.post('/posts/add', data)
}

export default { add }
