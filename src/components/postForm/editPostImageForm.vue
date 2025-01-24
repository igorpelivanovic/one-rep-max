<script setup lang="ts">
import { reactive } from 'vue'
import ImageField from '../form/ImageField.vue'
import { file, fileExtension, fileMaxSize } from '@/utils/formValidation'
import useFormValidation from '@/composables/formValidation'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'
import { ref } from 'vue'
import post from '@/api/post'
import { computed } from 'vue'
import FormLayout from '../layout/FormLayout.vue'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import ImageFieldTemplate from './postFormInputs/ImageFieldTemplate.vue'
import { useAlertBoxStore } from '@/stores/alertBox'

const { initialFormData } = defineProps({
  initialFormData: {
    type: Object,
    required: true,
  },
})

const initialImageData = ref(initialFormData.image)

const { addSuccess } = useAlertBoxStore()

const formData = reactive({ image: undefined })
const responseError = ref(null)
const isLoading = ref(false)

const validation = {
  image: [
    file('nevalidan fajl'),
    fileExtension(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], 'nevalidan fajl'),
    fileMaxSize(5120, 'preveliki fajl'),
  ],
}

const submitForm = async () => {
  try {
    isLoading.value = true
    await post.updateImage({ id: initialFormData.id, ...formData })
    addSuccess({ content: 'uspešno izemenjena slika bloga' })
  } catch (e) {
    console.log(e)
    responseError.value = e?.response?.data?.message || 'something wrong'
  } finally {
    isLoading.value = false
  }
}

const isDirtyForm = computed(() => formData.image != undefined)

const rednerImage = computed(() => initialFormData.image && formData.image === undefined)

const { onSubmit, errors } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitForm,
})
</script>

<template>
  <SpinnerContainer v-if="isLoading" />
  <FormLayout @form-submit="onSubmit" custom-class="post-form edit">
    <template #header>
      <h2 class="post-form-title">izmeni sliku</h2>
    </template>
    <template #fields-section>
      <ImageField
        v-model="formData.image"
        label-id="image"
        style-class="image-field-container"
        :error="errors?.image"
      >
        <template #placeholder>
          <div class="image-wrapper" v-if="rednerImage">
            <img :src="initialImageData" />
          </div>
          <ImageFieldTemplate v-else />
        </template>
      </ImageField>
    </template>
    <template #actions-section>
      <div class="bottom-section">
        <div class="form-action-btns-container">
          <button type="button" :disabled="!isDirtyForm" @click="formData.image = undefined">
            očisti
          </button>
          <button type="submit" :disabled="!isDirtyForm">izmeni sliku</button>
        </div>
        <AuthFormErrorMessage
          v-if="responseError"
          custom-class="response-error post-edit-form-error"
          :message="responseError"
        ></AuthFormErrorMessage>
      </div>
    </template>
  </FormLayout>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
