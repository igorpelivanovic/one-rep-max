<script setup>
import PersonalPlan from '@/components/personal_plan/PersonalPlan.vue'
</script>

<template>
  <div class="container">
    <main>
      <PersonalPlan></PersonalPlan>
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
