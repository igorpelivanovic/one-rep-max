<script setup>
import { useTemplateRef, onMounted } from 'vue'
const props = defineProps(['type', 'value', 'disabled', 'title', 'checked'])
const emit = defineEmits(['clicked'])

const inputDOM = useTemplateRef('input')

function handleHover(e) {
  e.target.classList.toggle('label-hover')
  const forAttr = e.target.htmlFor
  const mgElementId = forAttr.substring(0, forAttr.length - 3)
  const mgSvgElement = document.getElementById(mgElementId)
  if (mgSvgElement.classList.value && mgSvgElement.classList.value != 'muscle-group-hover') {
    mgSvgElement.classList.remove('muscle-group-hover')
    return
  }
  mgSvgElement.classList.toggle('muscle-group-hover')
}

function handleClicked(e) {
  emit('clicked', e.target.value)
}
onMounted(() => {
  inputDOM.value.checked = props.checked
})
</script>

<template>
  <label
    :for="props.value + (props.type === 'radio' ? '-rb' : '-cb')"
    :class="{ 'disable-label': props.disabled }"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
  >
    <input
      ref="input"
      :type="props.type"
      :name="(props.type === 'radio' ? 'primary' : 'secondary') + '-mg'"
      :id="props.value + (props.type === 'radio' ? '-rb' : '-cb')"
      :value="props.value"
      @input="handleClicked"
    />
    <span>{{ props.title }}</span>
  </label>
</template>

<style scoped>
input {
  display: none;
}

label {
  display: inline-block;
  cursor: pointer;
  border-radius: 20px;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
}

.disable-label {
  pointer-events: none;
  cursor: default;
}

@media screen and (min-width: 1024px) {
  .label-hover:has(:not(input:checked)) {
    background-color: #cbcbcb;
  }
}
</style>
