<script setup>
import post from '@/api/post'
import useFormValidation from '@/composables/formValidation'
import {
  file,
  fileExtension,
  fileMaxSize,
  maxLength,
  min,
  minLength,
  number,
  required,
} from '@/utils/formValidation'
import { computed } from 'vue'
import { ref } from 'vue'
import { reactive } from 'vue'
import SpinnerContainer from '../spinner/SpinnerContainer.vue'
import InputField from '../form/InputField.vue'
import SelectInput from '../form/SelectInput.vue'
import ImageField from '../form/ImageField.vue'
import TextAreaField from '../form/TextAreaField.vue'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import TextAreaTemplate from './postFormInputs/TextAreaTemplate.vue'
import FormLayout from '../layout/FormLayout.vue'
import ImageFieldTemplate from './postFormInputs/ImageFieldTemplate.vue'
import { useAlertBoxStore } from '@/stores/alertBox'
import router from '@/router'

const initalFormData = {
  title: '',
  text: '',
  categoryId: 0,
  img: null,
}

const formData = reactive({ ...initalFormData })

const isLoading = ref(false)

const categoryOptions = ref([
  { value: 1, title: 'workout' },
  { value: 2, title: 'nutritional' },
  { value: 3, title: 'lifestyle' },
])

const responseError = ref(null)
const { addSuccess, addError } = useAlertBoxStore()

const submitForm = async () => {
  try {
    isLoading.value = true
    responseError.value = null
    const response = await post.add(formData)
    addSuccess({ content: 'uspešno dodata vežba' })
    router.push({ name: 'BlogPostView', params: { id: response.data.data.id } })
    resetForm()
  } catch (e) {
    responseError.value = e?.response?.data?.message || 'something wrong'
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  reset()
  Object.assign(formData, initalFormData)
  return
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
  categoryId: [required('opis je obavezan'), number('nevalidan podatak'), min(1)],
  img: [
    file('nevalidan fajl'),
    fileExtension(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], 'nevalidan fajl'),
    fileMaxSize(5120, 'preveliki fajl'),
  ],
}

const { onSubmit, errors, reset, isDirty } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitForm,
})

const rednerTextAreaClearBtn = computed(() => formData.text.length > 0)
</script>

<template>
  <SpinnerContainer
    v-if="isLoading"
    class="spinner-container body-disable-scroll"
  ></SpinnerContainer>
  <FormLayout @form-submit="onSubmit" custom-class="post-form">
    <template #fields-section>
      <div class="top-section">
        <div class="form-section">
          <InputField
            label-id="title"
            title="naslov"
            v-model="formData.title"
            :error="errors?.title"
          ></InputField>
          <SelectInput
            :options="categoryOptions"
            v-model="formData.categoryId"
            labelId="categoryId"
            title="kategorija"
            :error="errors?.categoryId"
            placeholder="izaberite kategoriju"
          ></SelectInput>
          <ImageField
            v-model="formData.img"
            label-id="image"
            style-class="image-field-container"
            :error="errors?.img"
          >
            <template #placeholder>
              <ImageFieldTemplate />
            </template>
            <template #dragPlaceholder>
              <div class="drag-placeholder-container">
                <p>prevuci ovde</p>
              </div>
            </template>
          </ImageField>
        </div>
        <div class="form-section">
          <TextAreaField
            label-id="description"
            title="opis"
            v-model="formData.text"
            style-class="post-description-field"
            :error="errors?.text"
          >
            <template #other v-if="rednerTextAreaClearBtn">
              <TextAreaTemplate
                :text-value="formData.text"
                @clear-field="(val) => (formData.text = val)"
              />
            </template>
          </TextAreaField>
        </div>
      </div>
    </template>
    <template #actions-section>
      <div class="bottom-section">
        <div class="form-action-btns-container">
          <button type="button" :disabled="!isDirty" @click="resetForm">očisti</button>
          <button type="submit">kreiraj</button>
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

<style scoped>
.drag-placeholder-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}
.spinner-container {
  z-index: 5;
  position: fixed;
}
.top-section {
  flex: 1;
  display: flex;
  gap: 0px;
  flex-direction: column;
  .form-section {
    flex: 1;
  }
}
.bottom-section {
  display: flex;

  gap: 20px;
  flex-direction: column-reverse;

  .form-action-btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    button {
      cursor: pointer;
      background-color: var(--gray-650);
      border: none;
      padding: 8px 20px;
      text-transform: capitalize;
      font-size: 1.1rem;
      border-radius: 10px;
      &[type='submit'] {
        font-size: 1.2rem;
        padding-inline: 30px;
        background-color: var(--blue-700);
        color: var(--gray);
      }
    }
  }
  .response-error {
    position: relative;
    width: initial;
    margin: 0;
  }
}
@media screen and (min-width: 601px) {
  .bottom-section {
    align-items: flex-end;
    flex-direction: row-reverse;
    justify-content: space-between;
    .form-action-btns-container {
      gap: 15px;
      align-items: flex-end;
      button {
        font-size: 0.95rem;
        &[type='submit'] {
          font-size: 1rem;
        }
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .top-section {
    flex-direction: row;
    gap: 50px;
  }
  .bottom-section {
    .form-action-btns-container {
      button {
        font-size: 0.9rem;
        &[type='submit'] {
          font-size: 0.95rem;
        }
      }
    }
  }
}
</style>
