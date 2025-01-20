import { ref } from 'vue'
import api from '@/api/personal_plan'
import { defineStore } from 'pinia'

const usePlanStore = defineStore('plan', () => {
  const planData = ref(null)

  async function getPlanData() {
    const res = await api.getActivePlan()
    planData.value = res.data.data
  }

  function deactivatePlan(planId) {
    return api.changePlanState({ planId, action: 'deactivate' })
  }

  function resetPlan(planId) {
    const currTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return api.changePlanState({ planId, action: 'reset', currTime })
  }

  function checkActiveWeek(planId) {
    return api.checkActiveWeek({ planId })
  }

  function getActiveWeeklyPlan(weeklyPlanId) {
    return api.getWeeklyPlan({ weeklyPlanId })
  }

  function getWorkout(workoutId) {
    return api.getWorkout({ workoutId })
  }

  return {
    planData,
    getPlanData,
    deactivatePlan,
    resetPlan,
    checkActiveWeek,
    getActiveWeeklyPlan,
    getWorkout,
  }
})

export { usePlanStore }
