import { defineStore } from 'pinia'
import { ref } from 'vue'
const useLoadingViewStore = defineStore('loadginViewStore', () => {
  const isLoading = ref(false)
  return { isLoading }
})

export { useLoadingViewStore }
