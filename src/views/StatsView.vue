<script setup>
import { onBeforeMount } from 'vue'
import Stats from '@/api/stats'

onBeforeMount(() => {
  getStats()
})

const getStats = async () => {
  try {
    await Stats.getStats()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>test</template>
