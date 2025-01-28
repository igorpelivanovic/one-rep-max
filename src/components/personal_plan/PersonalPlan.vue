<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/personal_plan'
import PlanForm from '../personal_plan/PlanForm.vue'
import DeactivatePlanButton from './DeactivatePlanButton.vue'
import WorkoutInWeeklyPlan from './WorkoutInWeeklyPlan.vue'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'

let loading = ref(true)
let buttonDisable = ref(false)
const planStore = usePlanStore()
const exists = computed(() => {
  return !!planStore.planData
})
const finished = computed(() => {
  if (planStore.planData) {
    return planStore.planData.resetAllowed
  }
  return false
})
const deactivate = computed(() => {
  if (planStore.planData) {
    return planStore.planData.deactivateAllowed
  }
  return false
})
const weeklyPlan = ref(null)
const workouts = ref([])

async function getActivePlan() {
  try {
    await planStore.getPlanData()
    if (finished.value) {
      return
    }
    const res1 = await planStore.checkActiveWeek(planStore.planData.id)
    const res2 = await planStore.getActiveWeeklyPlan(res1.data.data.id)
    weeklyPlan.value = res2.data.data
    workouts.value = res2.data.data.workouts
  } catch (e) {
    if (e.status === 404 || e.status === 401) {
      exists.value = false
    }
  }
}

async function handlePlanReset() {
  buttonDisable.value = true
  loading.value = true
  try {
    await planStore.resetPlan(planStore.planData.id)
    await getActivePlan()
    buttonDisable.value = false
    loading.value = false
  } catch (e) {
    console.log(e)
  }
}

onBeforeMount(async () => {
  await getActivePlan()
  loading.value = false
})
</script>

<template>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
  <div class="personal-plan-wrapper" v-else>
    <div class="weekly-plan-wrapper" v-if="exists && !finished">
      <div class="title">
        <h2>Plan vežbanja</h2>
        <DeactivatePlanButton v-if="deactivate"></DeactivatePlanButton>
      </div>
      <div class="workouts">
        <WorkoutInWeeklyPlan
          v-for="wko in workouts"
          :key="wko.id"
          :workout-data="wko"
        ></WorkoutInWeeklyPlan>
      </div>
    </div>
    <div class="finished-plan-wrapper" v-else-if="finished">
      <h2>Čestitamo ti na uspešno završenom planu treninga!</h2>
      <span
        >Da nastaviš svoj fitnes put, izaberi jednu od ponuđenih opcija: ponovo započni ovaj plan
        ili ga deaktiviraj i kreiraj novi. </span
      ><span>
        Iako odabereš opciju da ponovo aktiviraš trenutni plan, u bilo kom trenutku ga možeš
        deaktivirati, ukoliko poželiš da kreiraš novi plan.</span
      >
      <div class="action-buttons-wrapper">
        <button @click="handlePlanReset" :disabled="loading">RESETUJ TRENUTNI PLAN</button>
        <DeactivatePlanButton></DeactivatePlanButton>
      </div>
    </div>
    <PlanForm v-else></PlanForm>
  </div>
</template>

<style scoped>
.weekly-plan-wrapper .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekly-plan-wrapper .workouts {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.finished-plan-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.finished-plan-wrapper span {
  display: inline-block;
  font-size: 1rem;
  text-align: center;
}

.action-buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-top: 2rem;
}

@media screen and (min-width: 601px) {
  .weekly-plan-wrapper .workouts {
    grid-template-columns: repeat(3, 1fr);
  }

  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(4)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(4)) {
    grid-template-columns: repeat(4, 1fr);
  }

  .weekly-plan-wrapper .workouts:has(> :last-child:nth-child(5)) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>

<style>
button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>
