<script setup>
import { ref, onMounted } from 'vue'
import { usePlanStore } from '@/stores/personal_plan.js'
import PersonalPlan from '@/components/personal_plan/PersonalPlan.vue'

const planStore = usePlanStore()
const hasPlan = ref(true)

onMounted(async () => {
  try {
    await planStore.getPlanData()
  } catch (e) {
    if (e.status === 404) {
      hasPlan.value = false
    }
  }
})
</script>

<template>
  <div class="container">
    <main>
      <PersonalPlan :exists="hasPlan"></PersonalPlan>
      {{ planStore.planData + ' ' + hasPlan }}
    </main>
    <aside></aside>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--white);
  display: grid;
  grid-template-columns: 1fr;
}
</style>
