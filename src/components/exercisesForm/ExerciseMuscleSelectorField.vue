<script setup>
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import MuscleGroupSelectorInput from '../muscle_group_selector/MuscleGroupSelectorInput.vue'

const { primary, secondaries, error } = defineProps({
  primary: {
    required: true,
  },
  secondaries: {
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
})
const emit = defineEmits(['update:primary', 'update:secondaries'])
</script>

<template>
  <div class="muscle-group-container">
    <MuscleGroupSelectorInput
      @primaryMgChange="(id) => emit('update:primary', id)"
      @secondaryMgsChange="(array) => emit('update:secondaries', array)"
      class="muscle-group"
    />
    <AuthFormErrorMessage v-if="error" custom-class="response-error" :message="error" />
  </div>
</template>
<style scoped>
.muscle-group-container {
  position: relative;
  margin-bottom: 50px;
  &:has(.response-error) {
    .muscle-group {
      border-color: var(--red);
    }
  }
  .muscle-group {
    border-radius: 10px;
    border: 1px solid var(--gray-600);
    padding: 10px 5px;
  }
}
</style>
