<script setup>
import { useTemplateRef, onMounted } from 'vue'
const props = defineProps(['type', 'name', 'value', 'title', 'disabled', 'checked'])
const emit = defineEmits(['selected'])

const inputDOM = useTemplateRef('input')

function handleHover(e) {
  if (e.target.children[0].checked) {
    return
  }
  e.target.classList.toggle('label-hover')
}

function handleSelect(e) {
  if (e.target.parentElement.classList.contains('label-hover')) {
    e.target.parentElement.classList.remove('label-hover')
  } else {
    e.target.parentElement.classList.add('label-hover')
  }
  emit('selected', [e.target.name, e.target.value])
}

onMounted(() => (inputDOM.value.checked = props.checked))
</script>

<template>
  <div class="checkbox-input-wrapper">
    <label
      :for="props.name + props.value + (props.type === 'radio' ? '-rb' : '-cb')"
      :class="{ disable: props.disabled }"
      @mouseenter="handleHover"
      @mouseleave="handleHover"
    >
      <input
        ref="input"
        :type="props.type"
        :name="props.name"
        :id="props.name + props.value + (props.type === 'radio' ? '-rb' : '-cb')"
        :checked="props.checked"
        :value="props.value"
        @input="handleSelect"
      />
      <span>{{ props.title ? props.title : props.value }}</span>
    </label>
  </div>
</template>

<style scoped>
input {
  display: none;
}

label {
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  border: 1px solid var(--gray-600);
  border-radius: 20px;
}

label > span {
  text-transform: uppercase;
}

label:has(input:checked) {
  background-color: var(--blue);
  color: var(--white);
  border: none;
}

.disable {
  pointer-events: none;
  cursor: default;
}

@media screen and (min-width: 1024px) {
  .label-hover:has(:not(input:checked)) {
    background-color: #cbcbcb;
  }
}
</style>
