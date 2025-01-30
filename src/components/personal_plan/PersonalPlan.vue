<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { usePlanStore } from '@/stores/personal_plan'
import PlanForm from './form/PlanForm.vue'
import DeactivatePlanButton from './DeactivatePlanButton.vue'
import ActivePlan from './ActivePlan.vue'
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

function getActivePlan() {
  console.log('getactiveplan')
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

async function handlePlanCreated() {
  loading.value = true
}

onBeforeMount(async () => {
  try {
    await planStore.getPlanData()
    loading.value = false
  } catch (e) {
    if (e.status === 404) {
      loading.value = false
    }
  }
})
</script>

<template>
  <SpinnerContainer v-if="loading"></SpinnerContainer>
  <div class="personal-plan-wrapper" v-else>
    <ActivePlan
      v-if="exists && !finished"
      :deactivate
      @loading-done="(value) => (loading = value)"
    ></ActivePlan>
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
    <PlanForm v-else @plan-created="handlePlanCreated"></PlanForm>
  </div>
</template>

<style scoped>
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
</style>

<style>
button {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem;
  cursor: pointer;
}

button:disabled {
  background-color: #0b5ad080;
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
