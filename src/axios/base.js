import axios from 'axios'
import { BaseAxiosHeader } from './_config'
import { API_BASE_URL } from '@/data/apiConfig'
import { isAxiosError } from 'axios'
import { useAlertBoxStore } from '@/stores/alertBox'

const baseAxios = axios.create({
  headers: BaseAxiosHeader,
  baseURL: API_BASE_URL,
})

baseAxios.interceptors.response.use(
  (resonse) => resonse,
  async (response) => {
    if (isAxiosError(response)) {
      const { status } = response
      if (status > 499 && status < 600) {
        useAlertBoxStore().addError()
      }
    }
    return Promise.reject(response)
  },
)

export { baseAxios }
