import { ref } from 'vue'
import api from '@/api/personal_plan'
import { defineStore } from 'pinia'

const usePlanStore = defineStore('plan', () => {
  const planData = ref(null)
  const userPlanData = ref(null)
  const userOrmData = ref(null)

  async function getPlanData() {
    const res = await api.getActivePlan()
    planData.value = res.data.data
  }

  async function createPlan(created) {
    return api.createPlan({ created })
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

  function swapExerciseRequest(exeId, workoutId) {
    return api.swapExerciseRequest({ exeId, workoutId })
  }

  function swapExercise(oldExeId, newExeId, workoutId) {
    return api.swapExercise({ oldExeId, newExeId, workoutId })
  }

  function getExerciseInWorkout(exerciseId, workoutId) {
    return api.getExerciseInWorkout({ exerciseId, workoutId })
  }

  function getUserPlanParams() {
    return api.getUserPlanParams()
  }

  function changeUserPlanParams(fitnessLvl, weeklyWkoNum, goal, wkoType, isInGym) {
    return api.changeUserPlanParams({
      lvlId: fitnessLvl,
      goal,
      isInGym,
      numOfWeeklyWorkouts: weeklyWkoNum,
      workoutType: wkoType,
    })
  }

  function getUserOrmParams() {
    return api.getUserOrmParams()
  }

  function setUserOrmParams(
    bench,
    squat,
    barbellrow,
    created = new Date().toISOString().slice(0, 19).replace('T', ' '),
  ) {
    return api.setUserOrmParams({ bench, squat, barbellrow, created })
  }

  function deactivateUserOrmParams() {
    return api.deactivateUserOrmParams()
  }

  return {
    planData,
    userPlanData,
    userOrmData,
    getPlanData,
    createPlan,
    deactivatePlan,
    resetPlan,
    checkActiveWeek,
    getActiveWeeklyPlan,
    getWorkout,
    swapExerciseRequest,
    swapExercise,
    getExerciseInWorkout,
    getUserPlanParams,
    changeUserPlanParams,
    getUserOrmParams,
    setUserOrmParams,
    deactivateUserOrmParams,
  }
})

export { usePlanStore }
