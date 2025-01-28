import { API_BASE_URL } from '@/data/apiConfig'
import axios from 'axios'
import AuthToken from '@/utils/authToken'

const planAxios = axios.create({
  baseURL: API_BASE_URL.concat('/plan'),
  headers: { 'X-MARS-SID': AuthToken.getAuthToken() },
})

export default planAxios
