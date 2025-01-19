<script setup>
import { ref, onMounted } from 'vue'
import { usePlanStore } from '@/stores/personal_plan'
import PlanForm from '../personal_plan/PlanForm.vue'
import DeactivatePlanButton from './DeactivatePlanButton.vue'
import WorkoutInWeeklyPlan from './WorkoutInWeeklyPlan.vue'

const props = defineProps(['exists'])
const planStore = usePlanStore()
const weeklyPlan = ref(null)

const finished = ref(false)

function handlePlanReset() {
  console.log('planReset')
}

onMounted(async () => {
  if (props.exists) {
    if (planStore.planData.resetAllowed) {
      finished.value = true
      return
    }
    try {
      const res1 = await planStore.checkActiveWeek(planStore.planData.id)
      const res2 = await planStore.getAcitveWeeklyPlan(res1.data.data.id)
      weeklyPlan.value = res2.data.data
    } catch (e) {
      console.log(e)
    }
  }
})
</script>

<template>
  <div class="personal-plan-wrapper">
    <div class="weekly-plan-wrapper" v-if="props.exists && !finished">
      <h2>Plan vežbanja</h2>
      <WorkoutInWeeklyPlan></WorkoutInWeeklyPlan>
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
