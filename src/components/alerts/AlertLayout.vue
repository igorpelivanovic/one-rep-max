<script setup>
import { useAlertBoxStore } from '@/stores/alertBox'
import { toRefs } from 'vue'
import Alert from './Alert.vue'

const { getAlerts } = toRefs(useAlertBoxStore())
</script>

<template>
  <div class="layout">
    <TransitionGroup name="alert-group" appear>
      <Alert :key="alert.id" :alert v-for="alert of getAlerts"></Alert>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.layout {
  z-index: 1;
  width: 200px;
  padding-right: 5px;
  position: fixed;
  top: 50px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  max-height: 200px;
  overflow: hidden;
}
.alert-group-move,
.alert-group-enter-active,
.alert-group-leave-active {
  transition: all 0.2s ease;
}

.alert-group-enter-from,
.alert-group-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.alert-group-leave-active {
  position: absolute;
  z-index: -1;
}
@media screen and (min-width: 481px) {
  .layout {
    width: 350px;
    padding-right: 10px;
    top: inherit;
    bottom: 50px;
    justify-content: flex-end;
    max-height: initial;
  }
}
</style>
