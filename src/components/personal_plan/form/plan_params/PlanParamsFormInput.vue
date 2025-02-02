<script setup>
import PlanFormRadioInput from './PlanFormRadioInput.vue'
import { InputProps } from '../validation/propValidation'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  specialStyle: {
    type: Boolean,
    default: false,
  },
  inputProps: {
    type: InputProps,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="plan-form-wrapper">
    <div class="plan-form-input-wrapper">
      <label :for="props.id" :class="{ 'error-input': props.error }">
        <span>{{ props.title }}</span>
      </label>
      <div class="inputs-wrapper" :class="{ special: props.specialStyle }">
        <PlanFormRadioInput
          v-for="(item, ind) in props.inputProps.inputValuesAndTitles"
          :key="ind"
          :id="props.id"
          :type="props.inputProps.inputType"
          :name="props.inputProps.inputName"
          :disabled="disabled"
          :checked="item.inputChecked"
          :value="item.inputValue"
          :title="item.inputTitle"
          @selected="(data) => $emit('selected', data)"
        ></PlanFormRadioInput>
      </div>
    </div>
    <span v-if="props.error" class="error-input"
      >Neophodno je da odabereš jednu od ponuđenih opcija.</span
    >
  </div>
</template>

<style scoped>
.plan-form-wrapper {
  margin-bottom: 1rem;
}

.plan-form-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-form-input-wrapper > label {
  align-self: baseline;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.inputs-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.error-input {
  color: var(--red);
}

.error-input > span {
  font-weight: 700;
}

.plan-form-wrapper > span {
  font-size: 0.8rem;
  font-weight: 400;
}

@media screen and (min-width: 350px) {
  .inputs-wrapper {
    flex-direction: row;
  }

  .special {
    flex-direction: column;
  }
}

@media screen and (min-width: 481px) {
  .special {
    flex-direction: row;
  }
}
</style>
