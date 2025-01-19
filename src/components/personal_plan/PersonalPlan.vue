<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/personal_plan'
import PlanForm from '../personal_plan/PlanForm.vue'
import DeactivatePlanButton from './DeactivatePlanButton.vue'
import WorkoutInWeeklyPlan from './WorkoutInWeeklyPlan.vue'

const planStore = usePlanStore()
const exists = ref(true)
const finished = ref(false)

const weeklyPlan = ref(null)
const workouts = ref([])

function handlePlanReset() {
  console.log('planReset')
}

onBeforeMount(async () => {
  try {
    await planStore.getPlanData()
    if (planStore.planData.resetAllowed) {
      finished.value = true
      return
    }
    const res1 = await planStore.checkActiveWeek(planStore.planData.id)
    const res2 = await planStore.getActiveWeeklyPlan(res1.data.data.id)
    weeklyPlan.value = res2.data.data
    workouts.value = res2.data.data.workouts
  } catch (e) {
    if (e.status === 404) {
      exists.value = false
    }
  }
})
</script>

<template>
  <div class="personal-plan-wrapper">
    <div class="weekly-plan-wrapper" v-if="exists && !finished">
      <h2>Plan vežbanja</h2>
      <WorkoutInWeeklyPlan
        v-for="wko in workouts"
        :key="wko.id"
        :workout-data="wko"
      ></WorkoutInWeeklyPlan>
    </div>
    <div class="finished-plan-wrapper" v-else-if="finished">
      <h2>Bravo! Uspešno si završio/la svoj plan treninga!</h2>
      <span
        >Da nastaviš svoj fitnes put, izaberi jednu od ponuđenih opcija: ponovo započni ovaj plan
        ili ga deaktiviraj i kreiraj novi.</span
      >
      <button @click="handlePlanReset">Resetuj trenutni plan</button>
      <DeactivatePlanButton></DeactivatePlanButton>
    </div>
    <PlanForm v-else></PlanForm>
  </div>
</template>

<style scoped></style>
