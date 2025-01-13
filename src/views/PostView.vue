<script setup>
import { useAlertBoxStore } from '@/stores/alertBox'

const { addAlert } = useAlertBoxStore()

const btnClickHandle = () => {
  addAlert({
    content: 'test',
    type: 'test',
    time: 20000,
  })
  return
}

const btnClickHandle2 = () => {
  addAlert({
    content: 'test',
    type: 'test',
    time: 20000,
    enableClose: true,
  })
  return
}
</script>

<template>
  <div>
    post view
    <button type="button" @click="btnClickHandle">add alert</button>
    <button type="button" @click="btnClickHandle2">add alert enable close</button>
  </div>
</template>
