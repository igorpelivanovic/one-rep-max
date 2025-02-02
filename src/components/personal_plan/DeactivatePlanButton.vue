<script setup>
import { ref } from 'vue'
import { usePlanStore } from '@/stores/planStore'

const planStore = usePlanStore()
let buttonDisable = ref(false)

async function handlePlanDeactivate() {
  buttonDisable.value = true
  try {
    await planStore.deactivatePlan(planStore.planData.id)
    planStore.planData = null
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div>
    <button @click="handlePlanDeactivate">DEAKTIVIRAJ PLAN</button>
  </div>
</template>

<style scoped></style>
