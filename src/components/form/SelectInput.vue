<script setup>
import useClickOutside from '@/composables/clickOutside'
import FieldBaseInput from './FieldBaseInput.vue'
import { computed } from 'vue'
import { useTemplateRef } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const { options, modelValue, labelId, title, placeholder, error } = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  labelId: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  inputType: {
    type: String,
    default: 'text',
  },
  error: {
    type: [String, undefined],
  },
  title: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'odaberite opciju',
  },
})

const componentRef = useTemplateRef('componentRef')

const elementRef = computed(() => componentRef.value.wrapper)

const renderOptionsContainer = ref(false)

const hideOptionsContainer = () => {
  renderOptionsContainer.value = false
  return
}

const toggleOptionsContainer = () => {
  renderOptionsContainer.value = !renderOptionsContainer.value
  return
}

const formatTitle = computed(() => {
  if (modelValue) {
    return options.find((opt) => opt.value === modelValue).title
  }
  return placeholder
})

useClickOutside(elementRef, hideOptionsContainer)
</script>
<template>
  <FieldBaseInput
    :render-clear-btn="false"
    :label-id
    ref="componentRef"
    :value="modelValue"
    :style-class="{ 'select-field': true, 'focus-input': renderOptionsContainer }"
    input-type="select"
    :title
    :error
    @click="toggleOptionsContainer"
  >
    <template #field>
      <div class="select-container">
        <div class="selected-option">
          <span class="title">{{ formatTitle }}</span>
          <span class="arrow-indicator" :class="{ down: renderOptionsContainer }">
            <i class="fas fa-angle-down"></i>
          </span>
        </div>
        <Transition name="options-container-trasnition-container">
          <div class="options-container" v-if="renderOptionsContainer">
            <ul>
              <template v-for="option of options" :key="option.value">
                <li
                  v-if="option.value != modelValue"
                  @click="$emit('update:modelValue', option.value)"
                >
                  {{ option.title }}
                </li>
              </template>
            </ul>
          </div>
        </Transition>
      </div>
    </template>
  </FieldBaseInput>
</template>
<style scoped>
.select-container {
  pointer-events: all;
}
.selected-option {
  width: 100%;
  span {
    &.title {
      &::first-letter {
        text-transform: capitalize;
      }
    }
    &.arrow-indicator {
      transform-origin: center;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      transition: 0.2s;
      &.down {
        transform: translateY(-50%) rotate(-180deg);
      }
    }
  }
}

.options-container {
  cursor: auto;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.16);
  z-index: 1;
  border: 1px solid;
  border-top: none;
  border-color: var(--gray-600);
  position: absolute;
  left: 0;
  right: 4px;
  top: calc(100% + 5px);
  background-color: var(--white);
  border-end-start-radius: 10px;
  border-end-end-radius: 10px;
  max-height: 250px;
  overflow-y: auto;
  ul {
    padding: 8px 0px 10px;

    li {
      position: relative;
      &::first-letter {
        text-transform: capitalize;
      }
      cursor: pointer;
      padding: 3px 12px;
      &:hover {
        background-color: var(--blue-300);
      }
    }
  }
}
span {
  display: block;
  padding-block: 1px;
  font-size: 1rem;
}
</style>
