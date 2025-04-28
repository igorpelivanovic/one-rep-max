<script setup>
import CarouselLayout from '@/components/carousel/CarouselLayout.vue'
import SlideLayout from '@/components/carousel/SlideLayout.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import PlanRecordsItem from './PlanRecordsItem.vue'

const props = defineProps({
  loaded: {
    type: Boolean,
    default: false,
  },
  plans: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <SpinnerContainer v-if="!props.loaded"></SpinnerContainer>
  <div v-else class="plan-records-wrapper">
    <CarouselLayout v-slot="{ currSlide }"
      ><SlideLayout v-for="(plan, ind) in props.plans" :key="ind"
        ><PlanRecordsItem
          v-show="currSlide === ind"
          :plan-stats="plan"
        ></PlanRecordsItem></SlideLayout
    ></CarouselLayout>
  </div>
</template>

<style scoped></style>
