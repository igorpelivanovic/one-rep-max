<script setup>
import { ref, computed } from 'vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import PersonalRecordItem from './PersonalRecordItem.vue'

const props = defineProps({
  records: {
    type: Array,
    default: () => [],
  },
  loaded: {
    type: Boolean,
    default: false,
  },
  isOnDash: {
    type: Boolean,
    default: true,
  },
})

const hasData = computed(() => {
  return !!props.records.length
})

const width = ref(window.innerWidth)
window.addEventListener('resize', () => {
  width.value = window.innerWidth
})
const recordsShown = computed(() => {
  if (!props.isOnDash) {
    return 16
  }
  if (width.value >= 601 && width.value < 900) {
    return 6
  }
  if (width.value >= 900) {
    return 8
  }
  return 4
})
</script>

<template>
  <SpinnerContainer v-if="!props.loaded"></SpinnerContainer>
  <div v-else class="personal-records-container">
    <div v-if="!hasData" class="no-data-wrapper">
      <h2>
        <span><i class="fa-solid fa-trophy"></i> </span> Već posle prvog treninga ovde ćeš moći da
        vidiš svoje uspehe i rekorde!
      </h2>
    </div>
    <div v-else class="personal-records-data-wrapper">
      <div class="records-title">
        <span><i class="fa-solid fa-trophy"></i></span>
        <h2>Moji rekordi</h2>
      </div>
      <div class="records-grid">
        <div v-for="(record, ind) in records.slice(0, recordsShown)" :key="ind">
          <PersonalRecordItem
            :exr-name="record.exrName"
            :mg-name="record.muscleGroupName"
            :weight="record.record"
          ></PersonalRecordItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-records-container {
  display: flex;
  flex-direction: column;
}

.no-data-wrapper {
  background-color: var(--orange);
  color: var(--blue-600);
  padding: 2rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
}

.records-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.records-title {
  display: flex;
  gap: 1rem;
  color: var(--orange);
  align-items: center;
  margin-bottom: 2rem;
}

.records-title > span {
  font-size: 1.5rem;
}

@media screen and (min-width: 380px) {
  .records-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 601px) {
  .records-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 900px) {
  .records-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
