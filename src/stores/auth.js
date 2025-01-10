import auth from '@/api/auth'
import router from '@/router'
import authToken from '@/utils/authToken'
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

const useAuthUserStore = defineStore('auth', () => {
  let user = reactive(null)

  const getUser = computed(() => user)

  const login = async (data) => {
    try {
      const response = await auth.login(data)
      const resData = response.data.data
      user = { ...user, ...resData.user }
      authToken.setAuthToken(resData.sessionId)
      router.push({ name: 'profile' })
      return true
    } catch (e) {}
  }

  const logout = async () => {
    try {
      await auth.logout()
      authToken.removeAuthToken()
      router.push({ name: 'home' })
      return true
    } catch (e) {}
  }

  const me = async () => {
    try {
      if (authToken.getAuthToken()) {
        const response = await auth.userData()
        const resData = response.data.data
        user = { ...user, ...resData.user }
        return true
      }
      return false
    } catch (e) {
      authToken.removeAuthToken()
    }
  }

  const isLogged = () => authToken.getAuthToken() && !!user

  return { getUser, login, logout, me, isLogged, user }
})

export { useAuthUserStore }
