<script setup>
import { useRouter } from 'vue-router'

const { exercise } = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove'])
const router = useRouter()
</script>

<template>
  <RouterLink :to="{ name: 'preview-exercise', params: { id: exercise.id } }">
    <div class="exercise-container preview-content">
      <p class="category">{{ exercise.type }}</p>
      <p class="title">{{ exercise.name }}</p>
      <p class="desc">aktivira: {{ exercise.muscle_groups }}</p>
      <div class="action-btns-container">
        <button type="button" @click.prevent="emit('remove')">
          <span class="icon">
            <i class="fas fa-trash-can"></i>
          </span>
        </button>
        <button
          type="button"
          @click.prevent="() => router.push({ name: 'editExercise', params: { id: exercise.id } })"
        >
          <span class="icon">
            <i class="fas fa-pencil"></i>
          </span>
        </button>
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
a {
  text-decoration: none;
  color: var(--black);
}
.preview-content.exercise-container {
  padding: 5px 10px 0px;
  background-color: var(--white);
  p {
    &.title {
      margin-top: 5px;
      font-size: 1.05rem;
      font-weight: 700;
    }
    &.category {
      font-size: 0.95rem;
    }
    &.desc {
      width: 100%;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    margin: 0;

    &::first-letter {
      text-transform: capitalize;
    }
  }
  .action-btns-container {
    margin-block: 20px 0;
  }
}
</style>
