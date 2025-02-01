<script setup lang="ts">
import { useAuthUserStore } from '@/stores/auth'
import DashContentContainer from './DashContentContainer.vue'
import { toRefs } from 'vue'
import { computed } from 'vue'

const { getUser } = toRefs(useAuthUserStore())

const { plans, users } = defineProps({
  plans: {
    type: Number,
    required: true,
  },
  users: {
    type: Number,
    requirede: true,
  },
})

const statusApp = computed(() => {
  return (plans / users) * 100
})

const statusStyleClass = computed(() => {
  if (statusApp.value < 30) return 'bad'
  if (statusApp.value < 55) return 'good'
  if (statusApp.value < 85) return 'ok'
  return 'excellent'
})

const statusMessage = computed(() => {
  if (statusApp.value < 30) return 'loša'
  if (statusApp.value < 55) return 'dobra'
  if (statusApp.value < 85) return 'zadovoljavajuća'
  return 'odlična'
})

const fullName = computed(() => {
  const { usr_name, usr_fullname } = getUser.value
  return `${usr_name} ${usr_fullname}`
})
</script>

<template>
  <DashContentContainer custom-class="hellow-content gray">
    <template #header>
      <h2>
        dobrodošao nazad, <span>{{ fullName }}!</span>
      </h2>
    </template>
    <template #body>
      <div class="content" :class="statusStyleClass">
        <p>
          <span class="value">{{ statusApp }}%</span> korisnika poseduje aktivan plan.
        </p>
        <p>
          produktivnost aplikacije je <span class="value">{{ statusMessage }}!</span>
        </p>
      </div>
    </template>
  </DashContentContainer>
</template>

<style scoped>
.hellow-content {
  position: relative;
  gap: 40px;
  order: 1;
}
h2 {
  text-transform: none;
  font-weight: 400;
  &::first-letter {
    text-transform: capitalize;
  }
  span {
    color: var(--blue-600);
    text-transform: capitalize;
    font-weight: 700;
  }
}
.content {
  &::before {
    content: '';
  }
  p {
    span.value {
      font-weight: 700;
    }
    margin: 0;
    margin-bottom: 8px;
    &::first-letter {
      text-transform: capitalize;
    }
  }
  &.bad {
    span.value {
      color: var(--alert-red-dark);
    }
  }
  &.good {
    span.value {
      color: var(--yellow-600);
    }
  }
  &.ok {
    span.value {
      color: var(--alert-blue-dark);
    }
  }
  &.excellent {
    span.value {
      color: var(--alert-green-dark);
    }
  }
}
</style>
