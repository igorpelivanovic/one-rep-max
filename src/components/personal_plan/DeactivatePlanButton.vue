<script setup>
import { usePlanStore } from '@/stores/personal_plan'

const planStore = usePlanStore()

function handlePlanDeactivate() {
  console.log('plan deactivated' + planStore.planData.id)
}
</script>

<template>
  <div>
    <button @click="handlePlanDeactivate">Deaktiviraj plan</button>
  </div>
</template>

<style scoped></style>
