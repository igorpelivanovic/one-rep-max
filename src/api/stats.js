import { authAxios } from '@/axios/auth'
function getStats() {
  return authAxios.get('/statistics')
}

export default { getStats }
