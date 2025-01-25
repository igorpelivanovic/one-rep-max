<script setup lang="ts">
import DashContentContainer from './DashContentContainer.vue'
import StatsSection from './StatsSection.vue'

const { stats } = defineProps({
  stats: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <DashContentContainer id="stats">
    <template #header>
      <h2>statistika</h2>
    </template>
    <template #body>
      <div class="stats-content-container">
        <StatsSection
          title="korisnika"
          :value="stats.num_of_register_users"
          v-if="stats.num_of_active_plans != undefined"
        >
          <template #icon>
            <div class="icon users">
              <i class="fas fa-users"></i>
            </div>
          </template>
        </StatsSection>
        <StatsSection
          title="aktivni planovi"
          :value="stats.num_of_active_plans"
          v-if="stats.num_of_active_plans != undefined"
        >
          <template #icon>
            <div class="icon plans">
              <i class="fas fa-users"></i>
            </div>
          </template>
        </StatsSection>
        <StatsSection
          title="vežbi"
          :value="stats.num_of_exercises"
          v-if="stats.num_of_active_plans != undefined"
        >
          <template #icon>
            <div class="icon exercises">
              <i class="fas fa-dumbbell"></i>
            </div>
          </template>
        </StatsSection>
        <StatsSection
          title="blogova"
          :value="stats.num_of_posts"
          v-if="stats.num_of_active_plans != undefined"
        >
          <template #icon>
            <div class="icon blog">
              <i class="fas fa-newspaper"></i>
            </div>
          </template>
        </StatsSection>
      </div>
    </template>
  </DashContentContainer>
</template>

<style scoped>
#stats {
  border-radius: 0;
  padding: 0;
}
.stats-content-container {
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: stretch;
  .icon {
    margin: auto;
    font-size: 1.4rem;
    background-color: red;
    width: 55px;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &.users {
      color: var(--alert-blue-dark);
      background-color: var(--alert-blue-light);
    }
    &.plans {
      color: var(--alert-green-dark);
      background-color: var(--alert-green-light);
    }
    &.exercises {
      color: var(--yellow-600);
      background-color: var(--yellow-100);
    }
    &.blog {
      color: var(--purple-600);
      background-color: var(--purple-100);
    }
  }
}
</style>
