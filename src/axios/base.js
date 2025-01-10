import axios from 'axios'
import { BaseAxiosHeader } from './_config'
import { API_BASE_URL } from '@/data/apiConfig'

const baseAxios = axios.create({
  headers: BaseAxiosHeader,
  baseURL: API_BASE_URL,
})

export { baseAxios }
