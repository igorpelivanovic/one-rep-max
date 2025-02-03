<script setup>
import { ref, onMounted, useTemplateRef } from 'vue'

const carouselDOM = useTemplateRef('this-carousel')

const props = defineProps({
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
})

const currSlide = ref(0)
const getSlideCount = ref(null)

function nextSlide() {
  if (!((currSlide.value + 1) % getSlideCount.value)) {
    currSlide.value = getSlideCount.value - 1
    return
  }
  currSlide.value = (currSlide.value + 1) % getSlideCount.value
}

function prevSlide() {
  if ((currSlide.value - 1) % getSlideCount.value < 0) {
    currSlide.value = 0
    return
  }
  currSlide.value = (currSlide.value - 1) % getSlideCount.value
  if (currSlide.value < 0) {
    currSlide.value += getSlideCount.value
  }
}

function goToSlide(index) {
  currSlide.value = index
}

onMounted(() => {
  getSlideCount.value = carouselDOM.value.querySelectorAll('.slide').length
})
</script>

<template>
  <div class="carousel" ref="this-carousel">
    <slot :currSlide="currSlide"></slot>
    <div v-if="props.navigation" class="navigate">
      <div class="toggle-page left">
        <i @click="prevSlide" class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="toggle-page right">
        <i @click="nextSlide" class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div v-if="props.pagination" class="pagination">
      <span
        @click="goToSlide(ind)"
        class="pagination-span"
        v-for="(slide, ind) in getSlideCount"
        :key="ind"
        :class="{ active: ind === currSlide }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.navigate {
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-page {
  display: flex;
  flex: 1;
}

.navigate > .right {
  justify-content: flex-end;
}

i {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: var(--gray-700);
  color: var(--white);
}

.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination-span {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--gray);
}

.active {
  background-color: var(--yellow-600);
}
</style>
