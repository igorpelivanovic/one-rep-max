<script setup>
import { useAlertBoxStore } from '@/stores/alertBox'
import { toRefs } from 'vue'

const { removeAlert, ...alertBoxStore } = useAlertBoxStore()

const { getAlerts } = toRefs(alertBoxStore)

const btnClickHandle = (id) => {
  removeAlert(id)
  return
}
</script>

<template>
  <div class="layout" v-if="getAlerts.length > 0">
    <div v-for="alert of getAlerts" :key="alert.id">
      {{ alert.content }}
      <div v-if="alert.enableClose">
        <button type="button" @click="() => btnClickHandle(alert.id)">close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
