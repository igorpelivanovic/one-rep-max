<script setup>
import useClickOutside from '@/composables/clickOutside'
import FieldBaseInput from './FieldBaseInput.vue'
import { computed } from 'vue'
import { useTemplateRef } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import OptionsContainer from './OptionsContainer.vue'

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

const elementRef = computed(() => componentRef.value?.wrapper)

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

const formatOptions = computed(() => {
  return options.filter((opt) => opt.value !== modelValue)
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
          <OptionsContainer
            @close="renderOptionsContainer = false"
            :options="formatOptions"
            v-if="renderOptionsContainer"
            @checked="$emit('update:modelValue', $event)"
          />
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

span {
  display: block;
  padding-block: 1px;
  font-size: 1rem;
}
</style>
