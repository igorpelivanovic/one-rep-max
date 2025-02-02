import auth from '@/api/auth'
import router from '@/router'
import authToken from '@/utils/authToken'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { removeExercises, removeUsedWeights } from '@/utils/exeInWkoToken'

const useAuthUserStore = defineStore('auth', () => {
  const user = ref(null)

  const getUser = computed(() => user)

  const login = async (data) => {
    const response = await auth.login(data)
    const resData = response.data.data
    user.value = { ...user.value, ...resData.user }
    authToken.setAuthToken(resData.sessionId)
    router.push({ name: 'profile' })
    return true
  }

  const logout = async () => {
    await auth.logout()
    authToken.removeAuthToken()
    user.value = null
    removeExercises()
    removeUsedWeights()
    router.replace({ name: 'login' })

    return true
  }

  const me = async () => {
    if (authToken.getAuthToken() && !user.value) {
      const response = await auth.userData()
      const resData = response.data.data
      user.value = { ...user, ...resData.user }
    }
    return true
  }

  const register = async (data) => {
    await auth.register(data)
    router.replace({ name: 'login' })
    return true
  }

  const role = computed(() => user.value?.role || null)

  return { getUser, login, logout, me, register, role, user }
})

export { useAuthUserStore }
