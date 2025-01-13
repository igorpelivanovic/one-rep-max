import { defineStore } from 'pinia'
import { ref } from 'vue'
const useLoadingRouteStore = defineStore('loadginRouteStore', () => {
  const isLoading = ref(false)
  return { isLoading }
})

export { useLoadingRouteStore }
