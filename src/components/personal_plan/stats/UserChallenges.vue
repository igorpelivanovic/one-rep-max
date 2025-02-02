<script setup>
const props = defineProps({
  numOfChallenges: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="challenges-container">
    <h3>
      <span><i class="fa-solid fa-trophy"></i> </span> Broj odrađenih izazova
    </h3>
    <span>{{ props.numOfChallenges }}</span>
  </div>
</template>

<style scoped>
.challenges-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--orange);
  color: var(--blue-600);
  padding: 1rem;
  border-radius: 2rem;
}

.challenges-container > h3 {
  text-align: center;
}

.challenges-container > span {
  display: inline-block;
  height: 4.5rem;
  font-size: 4rem;
  font-weight: 700;
}
</style>
