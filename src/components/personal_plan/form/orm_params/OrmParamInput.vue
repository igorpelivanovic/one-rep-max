<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  exercise: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['ormParamDataChange'])

let once = true
let loading = true
const paramData = ref({
  reps: null,
  weight: null,
})

function handleInput(event) {
  if (isNaN(event.target.value) || event.target.value === '') {
    paramData.value[event.target.name] = null
    return
  }
  paramData.value[event.target.name] = +event.target.value.trim()
}

watch(paramData.value, () => {
  if (loading) {
    loading = false
    return
  }
  emit('ormParamDataChange', [props.exercise, paramData.value])
})

function clickedOnInput(event) {
  event.target.children[1].focus()
}

function clearInput(id) {
  document.getElementById(id).value = ''
  paramData.value[document.getElementById(id).name] = null
}

watch(props, () => {
  if (once && loading) {
    paramData.value.reps = 1
    paramData.value.weight = props.weight
    once = false
  } else if (props.weight === 0) {
    if (props.deactivated) {
      paramData.value.reps = null
    }
    paramData.value.weight = null
  }
})
</script>

<template>
  <div class="orm-param-input-wrapper">
    <div class="input-wrapper">
      <div class="input" @click="clickedOnInput">
        <label :for="props.exercise + '-reps-input'">
          <span>Broj ponavljanja:</span>
        </label>
        <input
          type="text"
          :id="props.exercise + '-reps-input'"
          name="reps"
          :value="paramData.reps ? paramData.reps + '' : ''"
          size="5"
          @input="handleInput"
        />
      </div>
      <div>
        <button class="clear-button" @click="clearInput(props.exercise + '-reps-input')">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="input-wrapper">
      <div class="input" @click="clickedOnInput">
        <label :for="props.exercise + '-weight-input'">
          <span>Težina:</span>
        </label>
        <input
          type="text"
          :id="props.exercise + '-weight-input'"
          name="weight"
          :value="paramData.weight ? paramData.weight + '' : ''"
          size="5"
          @input="handleInput"
        />
      </div>
      <div>
        <button class="clear-button" @click="clearInput(props.exercise + '-weight-input')">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orm-param-input-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 0.5rem;
}

.input-wrapper {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid var(--gray-600);
  border-radius: 1rem;
  cursor: text;
}

.input-wrapper .input {
  flex-grow: 1;
}

.input-wrapper > .input > * {
  pointer-events: none;
}

.input-wrapper input {
  border: none;
  min-width: fit-content;
}

.clear-button {
  background: none;
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray-600);
  cursor: pointer;
}

@media screen and (min-width: 320px) {
  .input-wrapper {
    flex-direction: row;
  }
}

@media screen and (min-width: 481px) {
  .orm-param-input-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
