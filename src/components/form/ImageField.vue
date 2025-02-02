<script setup>
import { computed } from 'vue'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import { ref } from 'vue'
import { useSlots } from 'vue'
import { onMounted } from 'vue'

const { labelId, modelValue, error, styleClass, dragDrop } = defineProps({
  labelId: {
    required: true,
    type: String,
  },
  dragDrop: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    required: true,
  },
  error: {
    type: [String, undefined],
  },
  styleClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
const isDragging = ref(false)

const slots = useSlots()

const isEmptyInput = computed(() => !modelValue)

const previewImage = computed(() =>
  !isEmptyInput.value.val ? URL.createObjectURL(modelValue) : null,
)

const fileSizeToMB = computed(() => {
  if (!isEmptyInput.value) {
    return (modelValue.size / (1024 * 1024)).toFixed(2)
  }
  return 0
})

const renderBasePlaceholder = computed(
  () =>
    (isEmptyInput.value && !isDragging.value) ||
    (isEmptyInput.value && isDragging.value && !slots.dragPlaceholder()),
)
const renderDragPlaceholder = computed(
  () => isEmptyInput.value && isDragging.value && slots.dragPlaceholder(),
)

const changeInputValue = (val) => {
  emit('update:modelValue', val)
  return
}
const dropHandler = (e) => {
  e.preventDefault()
  if (!dragDrop) return
  changeInputValue(e.dataTransfer.files[0])
  isDragging.value = false
  return
}
const dragOverHandler = (e) => {
  e.preventDefault()
  if (!dragDrop) return
  isDragging.value = true
  return
}

const dragLeaveHandler = () => {
  if (!dragDrop) return
  isDragging.value = false
  return
}
</script>

<template>
  <div class="field-container label-container" :class="styleClass">
    <div class="field-content">
      <div class="input-container">
        <input type="file" :id="labelId" @change="(e) => changeInputValue(e.target.files[0])" />
      </div>
      <label
        :for="labelId"
        @drop="dropHandler"
        @dragover="dragOverHandler"
        @dragleave="dragLeaveHandler"
      >
        <div class="field-preview">
          <div class="file-preview-container" :class="{ isDragging }">
            <slot name="dragPlaceholder" v-if="renderDragPlaceholder"></slot>
            <slot name="placeholder" v-if="renderBasePlaceholder"></slot>
            <div class="preview-img-container" v-if="!isEmptyInput">
              <img :src="previewImage" alt="" />
            </div>
          </div>
          <div class="file-info-container" v-if="!isEmptyInput">
            <ul>
              <li>naziv: {{ modelValue.name }}</li>
              <li>tip: {{ modelValue.type }}</li>
              <li>veličina (MB): {{ fileSizeToMB }}</li>
            </ul>
          </div>
        </div>
      </label>

      <div class="action-container" v-if="!isEmptyInput">
        <button type="button" class="custom-clear-btn" @click="changeInputValue(null)">
          obriši
        </button>
      </div>
    </div>
    <Transition name="error-message">
      <AuthFormErrorMessage v-if="error" :message="error"></AuthFormErrorMessage>
    </Transition>
  </div>
</template>
<style scoped>
.field-container {
  position: relative;
  padding-bottom: 5px;
  .field-content {
    padding-bottom: 40px;
    position: relative;
    .input-container {
      display: none;
    }
    .field-preview {
      cursor: pointer;
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .file-preview-container {
        border: 1px solid;
        border-color: var(--gray-600);
        flex-shrink: 0;
        border-radius: 30px;
        width: 250px;
        height: 250px;
        overflow: hidden;
        background-color: var(--white);
        display: flex;
        align-items: center;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          transition: 0.2s;
        }
        &.isDragging {
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--transparent-gray);
          }
        }
        .preview-img-container {
          height: 100%;
          width: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
      .file-info-container {
        align-self: center;
        ul {
          display: flex;
          flex-direction: column;
          gap: 4px;
          li {
            &::first-letter {
              text-transform: capitalize;
            }
          }
        }
      }
    }
    .action-container {
      bottom: 0;
      position: absolute;
      width: 100%;
      text-align: center;
    }
  }
}

@media screen and (min-width: 601px) {
  .field-container {
    .field-content {
      width: fit-content;
      .field-preview {
        flex-direction: row;
      }
      .action-container {
        text-align: left;
      }
    }
  }
}
</style>
