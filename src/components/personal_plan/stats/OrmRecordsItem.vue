<script setup>
const props = defineProps({
  ormGroup: {
    type: Object,
    required: true,
  },
  isPersonalRecord: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="orm-stats-wrapper" :class="{ active: props.ormGroup.active }">
    <h3 v-if="props.ormGroup.active && !props.isPersonalRecord">Trenutne OneRepMax vrednosti</h3>
    <div>
      <div class="orm-param">
        <h3>
          Potisak na klupi
          <span v-if="props.isPersonalRecord"><i class="fa-solid fa-medal"></i></span>
        </h3>
        <span class="weight">{{ ormGroup.bench }}kg</span>
      </div>
      <div class="orm-param">
        <h3>
          Čučanj <span v-if="props.isPersonalRecord"><i class="fa-solid fa-medal"></i></span>
        </h3>
        <span class="weight">{{ ormGroup.squat }}kg</span>
      </div>
      <div class="orm-param">
        <h3>
          Veslanje u pretklonu
          <span v-if="props.isPersonalRecord"><i class="fa-solid fa-medal"></i></span>
        </h3>
        <span class="weight">{{ ormGroup.barbellrow }}kg</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orm-stats-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--blue-500);
  padding: 2rem 4rem 4rem 4rem;
  border-radius: 2rem;
  position: relative;
}

.orm-stats-wrapper > div {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.orm-param {
  padding: 2rem;
  background-color: var(--blue-800);
  color: var(--white);
  border-radius: 2rem;
}

.active {
  background-color: var(--orange-600);
}

h3 {
  margin-bottom: 1rem;
}

@media screen and (min-width: 769px) {
  .orm-stats-wrapper > div {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
