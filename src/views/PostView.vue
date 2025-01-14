<script setup>
import { useAlertBoxStore } from '@/stores/alertBox'
import PopUpLayout from '@/components/popup/PopUpLayout.vue'
import { ref } from 'vue'
import { useTemplateRef } from 'vue'

const { addAlert } = useAlertBoxStore()

const renderPopUp = ref(false)

const btnClickHandle = () => {
  addPopUp()
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

const btnref = useTemplateRef('btn')

const removePopUp = () => {
  renderPopUp.value = false
  return
}

const addPopUp = () => {
  renderPopUp.value = true
  return
}
</script>

<template>
  <div>
    post view
    <PopUpLayout v-if="renderPopUp" @close="removePopUp" :excludesRef="btnref"
      >aaaaaaaaaaa</PopUpLayout
    >
    <button type="button" ref="btn" @click="btnClickHandle">add alert</button>
    <button type="button" @click="btnClickHandle2">add alert enable close</button>
  </div>
</template>
