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

<style>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
