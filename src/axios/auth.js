import { API_BASE_URL } from '@/data/apiConfig'
import axios from 'axios'
import AuthToken from '@/utils/authToken'
import { BaseAxiosHeader } from './_config'

const authAxios = axios.create({
  baseURL: API_BASE_URL.concat('/auth'),
  headers: BaseAxiosHeader,
})

authAxios.interceptors.request.use((request) => {
  request.headers['X-MARS-SID'] = AuthToken.getAuthToken()
  return request
})

export { authAxios }
