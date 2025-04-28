<script setup>
import CarouselLayout from '@/components/carousel/CarouselLayout.vue'
import SlideLayout from '@/components/carousel/SlideLayout.vue'
import SpinnerContainer from '@/components/spinner/SpinnerContainer.vue'
import OrmRecordsItem from './OrmRecordsItem.vue'

const props = defineProps({
  loaded: {
    type: Boolean,
    default: false,
  },
  ormGroups: {
    type: Array,
    required: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  isPersonalRecord: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <SpinnerContainer v-if="!props.loaded"></SpinnerContainer>
  <div v-else class="orm-groups-wrapper">
    <CarouselLayout v-slot="{ currSlide }" :navigation="navigation" :pagination="pagination"
      ><SlideLayout v-for="(group, ind) in props.ormGroups" :key="ind"
        ><OrmRecordsItem
          v-show="currSlide === ind"
          :orm-group="group[0]"
          :is-personal-record="props.isPersonalRecord"
        ></OrmRecordsItem></SlideLayout
    ></CarouselLayout>
  </div>
</template>

<style scoped></style>
