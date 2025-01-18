import { ref } from 'vue'
import api from '@/api/personal_plan'
import { defineStore } from 'pinia'

const usePlanStore = defineStore('plan', () => {
  const planData = ref(null)

  async function getPlanData() {
    const res = await api.getActivePlan()
    planData.value = res.data.data
  }

  async function checkActiveWeek(planId) {
    return await api.checkActiveWeek({ planId })
  }

  return { planData, getPlanData, checkActiveWeek }
})

export { usePlanStore }
