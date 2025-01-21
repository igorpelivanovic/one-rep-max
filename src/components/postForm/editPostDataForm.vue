<script setup lang="ts">
import { reactive } from 'vue'
import InputField from '../form/InputField.vue'
import SelectInput from '../form/SelectInput.vue'
import TextAreaField from '../form/TextAreaField.vue'
import useFormValidation from '@/composables/formValidation'
import { maxLength, min, minLength, number, required } from '@/utils/formValidation'
import { computed } from 'vue'
import Format from '@/utils/format'
import { ref } from 'vue'
import post from '@/api/post'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'
import TextAreaTemplate from './postFormInputs/TextAreaTemplate.vue'
import FormLayout from '../layout/FormLayout.vue'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import { useAlertBoxStore } from '@/stores/alertBox'

const { initialFormData } = defineProps({
  initialFormData: {
    type: Object,
    required: true,
  },
})

const initFormDataRef = ref({ ...initialFormData })

const formData = reactive({ ...initFormDataRef.value })

const isLoading = ref(false)

const responseError = ref(null)
const { addSuccess } = useAlertBoxStore()

const submitFormHandle = async () => {
  try {
    isLoading.value = true
    responseError.value = null
    await post.updateData(formData)
    addSuccess({ content: 'uspešno izmenjen sadržaj bloga' })
  } catch (e) {
    responseError.value = e?.response?.data?.message || 'something wrong'
  } finally {
    isLoading.value = false
  }
}

const validation = {
  title: [
    required('naslov je obavezan'),
    minLength({ length: 3, msg: 'minimalna dužina 3 karaktera' }),
    maxLength({ length: 255, msg: 'maksimalna dužina 255' }),
  ],
  text: [
    required('opis je obavezan'),
    minLength({ length: 3, msg: 'minimalna dužina 3 karaktera' }),
    maxLength({ length: 65535, msg: 'maksimalna dužina 65.535' }),
  ],
  category_id: [required('opis je obavezan'), number('nevalidan podatak'), min(1)],
}

const { onSubmit, errors, isDirty, reset } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitFormHandle,
})

const resetForm = () => {
  Object.assign(formData, initFormDataRef.value)
  reset()

  return
}

const categoryOptions = ref([
  { value: 1, title: 'workout' },
  { value: 2, title: 'nutritional' },
  { value: 3, title: 'lifestyle' },
])

const formatCurrentNumberCarachterText = computed(() => Format.number(formData.text.length))

const rednerTextAreaClearBtn = computed(() => formData?.text?.length > 0)
</script>

<template>
  <SpinnerContainer v-if="isLoading" />
  <FormLayout @form-submit="onSubmit" custom-class="post-form edit">
    <template #header>
      <h2 class="post-form-title">izmeni sadržaj</h2>
    </template>
    <template #fields-section>
      <InputField
        label-id="title"
        title="naslov"
        v-model="formData.title"
        :error="errors?.title"
      ></InputField>
      <SelectInput
        :options="categoryOptions"
        v-model="formData.category_id"
        labelId="categoryId"
        title="kategorija"
        :error="errors?.categoryId"
        placeholder="izaberite kategoriju"
      ></SelectInput>
      <TextAreaField
        label-id="description"
        title="opis"
        v-model="formData.text"
        style-class="post-description-field"
        :error="errors?.text"
      >
        <template #other v-if="rednerTextAreaClearBtn">
          <TextAreaTemplate
            :textValue="formData.text"
            @clear-field="(val) => (formData.text = val)"
          />
        </template>
      </TextAreaField>
    </template>
    <template #actions-section>
      <div class="bottom-section">
        <div class="form-action-btns-container">
          <button :disabled="!isDirty" @click="resetForm" type="button">očisti</button>
          <button :disabled="!isDirty" type="submit">izemni</button>
        </div>
        <AuthFormErrorMessage
          v-if="responseError"
          custom-class="response-error"
          :message="responseError"
        ></AuthFormErrorMessage>
      </div>
    </template>
  </FormLayout>
</template>

<style scoped></style>
