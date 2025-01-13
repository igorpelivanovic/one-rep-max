import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const initValueAlerts = []

const AlertTypeStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}

const useAlertBoxStore = defineStore('alertBoxStore', () => {
  const alerts = ref(initValueAlerts)

  const addAlert = ({ content, type, time = 5000, enableClose = false }) => {
    const id = new Date().getMilliseconds()
    alerts.value.push({ id, content, type, enableClose })
    if (time > 0) {
      autoRemoveAlert(id, time)
      return
    }
  }

  const autoRemoveAlert = (id, time) => {
    setTimeout(removeAlert, time, id)
    return
  }

  const removeAlert = (id) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id)
    return
  }

  const clearAlerts = () => {
    alerts.value = initValueAlerts
    return
  }

  const getAlerts = computed(() => alerts)

  return { getAlerts, addAlert, removeAlert, clearAlerts }
})

export { useAlertBoxStore, AlertTypeStatus }
