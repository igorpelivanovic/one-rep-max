import auth from '@/api/auth'
import router from '@/router'
import authToken from '@/utils/authToken'
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

const useAuthUserStore = defineStore('auth', () => {
  let user = reactive(null)

  const getUser = computed(() => user)

  const login = async (data) => {
    const response = await auth.login(data)
    const resData = response.data.data
    user = { ...user, ...resData.user }
    authToken.setAuthToken(resData.sessionId)
    router.push({ name: 'profile' })
    return true
  }

  const logout = async () => {
    await auth.logout()
    authToken.removeAuthToken()
    router.replace({ name: 'auth' })
    return true
  }

  const me = async () => {
    if (authToken.getAuthToken() && !user) {
      const response = await auth.userData()
      const resData = response.data.data
      user = { ...user, ...resData.user }
    }
    return true
  }

  const isLogged = () => authToken.getAuthToken() && !!user

  const register = async (data) => {
    await auth.register(data)
    router.replace({ name: 'auth' })
    return true
  }

  return { getUser, login, logout, me, isLogged, register }
})

export { useAuthUserStore }
