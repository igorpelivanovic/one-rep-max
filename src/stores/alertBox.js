import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const AlertTypeStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}
const initValueAlerts = []

const errorMessgeDefault = 'došlo je do greške. Pokušajte kasnije.'

const useAlertBoxStore = defineStore('alertBoxStore', () => {
  const alerts = ref(initValueAlerts)

  const addAlert = ({ content, type, time, enableClose }) => {
    const id = new Date().getMilliseconds()
    alerts.value.push({ id, content, type, enableClose, time })
    if (time > 0) {
      autoRemoveAlert(id, time)
      return
    }
  }

  const addInfo = ({ content, time = 5000, enableClose = false }) => {
    addAlert({ ...{ content, time, enableClose }, type: AlertTypeStatus.INFO })
    return
  }

  const addSuccess = ({ content, time = 5000, enableClose = false }) => {
    addAlert({ ...{ content, time, enableClose }, type: AlertTypeStatus.SUCCESS })
    return
  }

  const addError = ({ content = errorMessgeDefault, time = 5000, enableClose = false } = {}) => {
    addAlert({ ...{ content, time, enableClose }, type: AlertTypeStatus.ERROR })
    return
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

  return { getAlerts, addError, addInfo, addSuccess, removeAlert, clearAlerts }
})

export { useAlertBoxStore, AlertTypeStatus }
