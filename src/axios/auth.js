import { API_BASE_URL } from '@/data/apiConfig'
import axios from 'axios'
import AuthToken from '@/utils/authToken'
import { BaseAxiosHeader } from './_config'
import { useAuthUserStore } from '@/stores/auth'
import { isAxiosError } from 'axios'
import { useAlertBoxStore } from '@/stores/alertBox'

const authAxios = axios.create({
  baseURL: API_BASE_URL.concat('/auth'),
  headers: BaseAxiosHeader,
})

authAxios.interceptors.request.use((request) => {
  request.headers['X-MARS-SID'] = AuthToken.getAuthToken()
  return request
})

authAxios.interceptors.response.use(
  (response) => response,
  async (response) => {
    if (isAxiosError(response)) {
      const { status } = response
      if ([401, 403].includes(status)) {
        await useAuthUserStore().logout()
        useAlertBoxStore().addError({ content: 'prijavite se ponovo' })
      }
      if (status > 499 && status < 600) {
        console.log('test')
        useAlertBoxStore().addError()
      }
    }
    return Promise.reject(response)
  },
)

export { authAxios }
