<script setup>
import post from '@/api/post'
import useFormValidation from '@/composables/formValidation'
import Format from '@/utils/format'
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

const submitForm = async () => {
  try {
    isLoading.value = true
    responseError.value = null
    await post.add(formData)
  } catch (e) {
    responseError.value = e?.response?.data?.message || 'something wrong'
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
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

const { onSubmit, errors } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitForm,
})

const formatCurrentNumberCarachterText = computed(() => Format.number(formData.text.length))

const rednerTextAreaClearBtn = computed(() => formData.text.length > 0)
</script>

<template>
  <SpinnerContainer
    v-if="isLoading"
    class="spinner-container body-disable-scroll"
  ></SpinnerContainer>
  <form class="post-form" @submit.prevent="onSubmit">
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
            <div class="no-image-placeholder-container">
              <div class="no-image-placeholder-content">
                <div class="icon-container">
                  <i class="fas fa-camera icon"></i>
                </div>
                <p class="title">
                  <span class="main">dodaj sliku</span>
                  <span>(maksimalna veličina 5MB)</span>
                </p>
              </div>
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
            <div class="text-area-bottom-content">
              <span class="letter-counter"
                >broj karaktera: {{ formatCurrentNumberCarachterText }} /
                {{ Format.number(65535) }}</span
              >
              <button type="button" class="custom-clear-btn" @click="formData.text = ''">
                obriši
              </button>
            </div>
          </template>
        </TextAreaField>
      </div>
    </div>
    <div class="bottom-section">
      <div class="form-action-btns-container">
        <button type="button" @click="resetForm">očisti</button>
        <button type="submit">kreiraj</button>
      </div>
      <AuthFormErrorMessage
        v-if="responseError"
        custom-class="response-error"
        :message="responseError"
      ></AuthFormErrorMessage>
    </div>
  </form>
</template>

<style scoped>
.spinner-container {
  z-index: 5;
  position: fixed;
}
form {
  display: flex;
  flex-direction: column;
  gap: 50px;
  .top-section {
    flex: 1;
    display: flex;
    gap: 0px;
    /*     gap: 50px;
 */
    flex-direction: column;
    .form-section {
      flex: 1;
      .text-area-bottom-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .letter-counter {
          &::first-letter {
            text-transform: capitalize;
          }
          color: var(--gray-700);
        }
      }
      .image-field-container {
      }
    }
    .no-image-placeholder-container {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      align-self: stretch;
      .no-image-placeholder-content {
        height: 60%;
        .icon-container {
          margin: auto;
          background-color: var(--gray-620);
          width: 50px;
          aspect-ratio: 1/1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          .icon {
            color: var(--gray);
            font-size: 1.4rem;
          }
        }
        p.title {
          font-size: 0.85rem;
          span {
            display: block;
            &.main {
              font-size: 0.95rem;
              text-transform: capitalize;
              margin-bottom: 5px;
            }
            &:not(.main) {
              font-style: italic;
            }
          }
        }
        text-align: center;
      }
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
        /*         font-size: 0.9rem;
 */
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
}
@media screen and (min-width: 601px) {
  form {
    .bottom-section {
      align-items: flex-end;
      flex-direction: row-reverse;
      justify-content: space-between;
      .form-action-btns-container {
        gap: 15px;
        align-items: flex-end;
        button {
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  form {
    .top-section {
      flex-direction: row;
      gap: 50px;
    }
  }
}
</style>
