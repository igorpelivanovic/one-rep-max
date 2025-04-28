<script setup>
import CircleProgressBar from '@/components/circle_progress_bar/CircleProgressBar.vue'
import { ref, onMounted } from 'vue'
import PersonalRecordItem from './PersonalRecordItem.vue'

const props = defineProps({
  planStats: {
    type: Object,
    required: true,
  },
})

const planWeightRecords = ref([])

function getPlanWeightRecords() {
  if (!Array.isArray(props.planStats.records)) {
    return
  }
  planWeightRecords.value = props.planStats.records
  planWeightRecords.value.sort(byWeightAsc).slice(0, 3)
}

function byWeightAsc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

onMounted(() => {
  getPlanWeightRecords()
})
</script>

<template>
  <div class="plan-stats-wrapper">
    <div class="row">
      <div class="finished-percent">
        <span>Odrađenih treninga </span>
        <CircleProgressBar :percentage="props.planStats.finishedPercent"></CircleProgressBar>
      </div>
      <div class="number-of-restarts">
        <h4>
          Plan je obnovljen
          <span>{{ props.planStats.numRepeated ? props.planStats.numRepeated : '0' }}</span> puta.
        </h4>
      </div>
    </div>
    <div class="weight-records" v-if="planWeightRecords.length">
      <p>Rekordi ovog plana</p>
      <div class="list">
        <div class="record" v-for="(record, ind) in planWeightRecords.slice(0, 3)" :key="ind">
          <PersonalRecordItem
            :exr-name="record.exrName"
            :weight="record.record"
            :mg-name="record.muscleGroupName"
          ></PersonalRecordItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-stats-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--blue-500);
  padding: 2rem 4rem 4rem 4rem;
  border-radius: 2rem;
  position: relative;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.finished-percent {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.finished-percent > span {
  font-size: 1.5rem;
}

.number-of-restarts {
  font-size: 1.5rem;
}

.weight-records {
  margin-top: 2rem;
}

.weight-records > p {
  font-weight: 700;
  padding-bottom: 1rem;
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media screen and (min-width: 769px) {
  .row {
    flex-direction: row;
    justify-content: space-around;
  }

  .list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
