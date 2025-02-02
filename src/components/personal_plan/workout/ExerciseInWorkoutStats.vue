<script setup>
import { getUsedWeightByExeId } from '@/utils/exeInWkoToken'

const props = defineProps({
  exeId: {
    type: Number,
    required: true,
  },
  exeName: {
    type: String,
    required: true,
  },
  weight: {
    type: Boolean,
    required: true,
  },
  isChallenge: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="exercise-in-stats-wrapper" :class="{ challenge: props.isChallenge }">
    <span
      ><i v-if="props.isChallenge" class="fa-solid fa-trophy"></i> {{ props.exeName }}
      <i v-if="props.weight" class="fa-solid fa-dumbbell"></i
    ></span>
    <span v-if="props.weight">{{ getUsedWeightByExeId(props.exeId) }}kg</span>
  </div>
</template>

<style scoped>
.exercise-in-stats-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-600);
}

.challenge {
  color: var(--orange);
  border-radius: 1rem;
  border: none;
  padding: 0.5rem 0;
}
</style>
