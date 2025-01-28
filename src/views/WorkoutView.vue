<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanStore } from '@/stores/personal_plan'

const route = useRoute()
const planStore = usePlanStore()
const workoutData = ref(null)

onMounted(async () => {
  try {
    const res = await planStore.getWorkout(route.params.id)
    workoutData.value = res.data.data
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="container">
    {{ workoutData }}
  </div>
</template>

<style scoped>
.container {
  background-color: var(--white);
}
</style>
