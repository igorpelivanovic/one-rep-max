<script setup>
import { useAlertBoxStore } from '@/stores/alertBox'
import { computed } from 'vue'

const alertConfigOptions = {
  success: {
    class: 'alert-success',
    icon: 'fa-check',
  },
  info: {
    class: 'alert-info',
    icon: 'fa-info',
  },
  error: {
    class: 'alert-error',
    icon: 'fa-xmark',
  },
}

const { alert } = defineProps({
  alert: {
    type: Object,
    required: true,
  },
})

const { removeAlert } = useAlertBoxStore()

const alertConfig = computed(() => alertConfigOptions[alert.type])

const aniamtionTimeLine = computed(() => 'animation:' + alert.time + 'ms linear timeLineLoader')

const btnClickHandle = (id) => {
  removeAlert(id)
  return
}
</script>

<template>
  <div class="alert-container" :class="alertConfig.class">
    <div class="alert-top-part">
      <div class="alert-content-container">
        <div class="alert-icon">
          <i class="fas" :class="alertConfig.icon"></i>
        </div>
        <p class="alert-content">
          {{ alert.content }}
        </p>
      </div>
      <div class="alert-btns-container" v-if="alert.enableClose">
        <button type="button" class="alert-close-btn" @click="() => btnClickHandle(alert.id)">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="alert-bottom-part">
      <div class="timeline-container" :style="aniamtionTimeLine"></div>
    </div>
  </div>
</template>

<style setup>
.alert-container {
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  &.alert-success {
    background-color: var(--alert-green-light);
    .alert-icon {
      background-color: var(--alert-green-dark);
      color: var(--alert-green-light);
    }
    .timeline-container {
      background-color: var(--alert-green-dark);
    }
    color: var(--alert-green-dark);
  }
  &.alert-error {
    background-color: var(--alert-red-light);
    .alert-icon {
      background-color: var(--alert-red-dark);
      color: var(--alert-red-light);
    }
    .timeline-container {
      background-color: var(--alert-red-dark);
    }
    color: var(--alert-red-dark);
  }
  &.alert-info {
    background-color: var(--alert-blue-light);
    .alert-icon {
      background-color: var(--alert-blue-dark);
      color: var(--alert-blue-light);
    }
    .timeline-container {
      background-color: var(--alert-blue-dark);
    }
    color: var(--alert-blue-dark);
  }
  .alert-top-part {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    .alert-content-container {
      padding: 10px 0 10px 12px;
      flex: 1;
      gap: inherit;
      display: flex;
      .alert-icon {
        width: 30px;
        aspect-ratio: 1/1;
        display: flex;
        align-self: flex-start;
        justify-content: center;
        align-items: center;
        border: 0;
      }
      .alert-icon {
        border-radius: 50%;
      }
      p.alert-content {
        flex: 1;
        font-size: 1rem;
        align-self: center;
        &::first-letter {
          text-transform: capitalize;
        }
        margin: 0;
      }
    }
    .alert-btns-container {
      align-self: stretch;
      display: block;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 8px;
      .alert-close-btn {
        display: flex;
        align-items: center;
        height: 31px;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
  .alert-bottom-part {
    .timeline-container {
      width: 100%;
      height: 4px;
    }
  }
}
</style>
