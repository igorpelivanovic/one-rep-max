<script setup>
import { reactive } from 'vue'
import FormLayout from '../layout/FormLayout.vue'
import useFormValidation from '@/composables/formValidation'
import {
  maxLength,
  minLength,
  required,
  include,
  boolean,
  url,
  number,
  min,
  custom,
} from '@/utils/formValidation'
import AuthFormErrorMessage from '../authForm/AuthFormErrorMessage.vue'
import CheckBoxField from '@/components/form/CheckBoxField.vue'
import { watch } from 'vue'
import InputField from '../form/InputField.vue'
import TextAreaField from '../form/TextAreaField.vue'
import { computed } from 'vue'
import TextAreaTemplate from '../postForm/postFormInputs/TextAreaTemplate.vue'
import RadioField from '@/components/form/RadioField.vue'
import ExerciseMuscleSelectorField from './ExerciseMuscleSelectorField.vue'
import { ref } from 'vue'
import { useTemplateRef } from 'vue'
import { onMounted } from 'vue'

const emit = defineEmits(['submitForm'])

const exerciseType = ['compound', 'isolation']

const initalFormData = {
  title: '',
  text: '',
  type: exerciseType[0],
  useWeight: false,
  videoUrl: '',
  isChallenge: false,
  isUnilateral: false,
  isUseMultiple_weights: false,
  isSpecial: false,
  primaryGroup: null,
  seconderyGroups: [],
}

const { data, errorMsg, titleBtn } = defineProps({
  data: {
    type: Object,
  },
  errorMsg: {
    type: String,
  },
  titleBtn: {
    type: String,
    default: 'kreiraj',
  },
})

const formDataInit = data || initalFormData

const formData = reactive({ ...formDataInit })

const resetForm = () => {
  reset()
  Object.assign(formData, formDataInit)
  return
}

const submitForm = async () => {
  emit('submitForm', formData, resetForm)
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
  type: [include(exerciseType, 'nevalidan podatak')],
  useWeight: [boolean('nevalidan podatak')],
  isSpecial: [boolean('nevalidan podatak')],
  isChallenge: [boolean('nevalidan podatak')],
  isUnilateral: [boolean('nevalidan podatak')],
  isUseMultiple_weights: [boolean('nevalidan podatak')],
  videoUrl: [url('nevalidan url')],
  primaryGroup: [number('nevalidan podatak'), min(1)],
  seconderyGroups: [
    custom((val) => {
      if (val.some((id) => number('sekundarne grupe su nevalidan podatak')(id))) return true
    }),
  ],
}

const { onSubmit, errors, reset, isDirty } = useFormValidation({
  values: formData,
  validation,
  onSuccess: submitForm,
})
const rednerTextAreaClearBtn = computed(() => formData.text.length > 0)

watch(
  () => formData.useWeight,
  () => {
    formData.isUnilateral = false
  },
)
</script>

<template>
  <FormLayout @form-submit="onSubmit" custom-class="post-form exercise-form">
    <template #fields-section>
      <div class="top-section">
        <div class="form-section">
          <InputField
            label-id="title"
            title="naziv"
            v-model="formData.title"
            :error="errors?.title"
          />
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
          <div class="type-container">
            <p>tip vežbe:</p>
            <div class="fields-container">
              <RadioField
                v-for="option of exerciseType"
                label-id="type"
                :option
                :title="option"
                v-model="formData.type"
                :key="option"
              />
            </div>
            <Transition name="error-message">
              <AuthFormErrorMessage
                class="def"
                v-if="errors?.type"
                :message="errors.type"
              ></AuthFormErrorMessage>
            </Transition>
          </div>

          <div class="other-params-container">
            <CheckBoxField
              :error="errors?.isChallenge"
              v-model="formData.isChallenge"
              label-id="isChallenge"
              title="vežba je challenge"
            />

            <CheckBoxField
              class="special"
              :error="errors?.isSpecial"
              v-model="formData.isSpecial"
              label-id="isSpecial"
            >
              <template #label>
                <span
                  >Vežba je specijalna
                  <sup
                    v-tooltip="{
                      title: 'title',
                      test: 'bebebe',
                      content: `Težine tegova sa kojima se rade vežbe računaju se kao procenat One Rep Max težina, i to za grupe mišića:
                                - ruku, grudi, i ramena koristi se 1RM Potiska na klupi,
                                - ledja koristi se 1RM Veslanja u pretklonu,
                                - nogu i trbušnjaka koristi se 1RM Čučnja.
                                Označite ovo polje, ukoliko se 1RM ove vežbe znatno razlikuje od 1RM referentne vežbe, na osnovu grupe mišića koju aktivira.
                                Primer: Leg Press i Mrtvo dizanje koriste veću težinu od čučnja, Bočno podizanje ruku koristi manju težinu od Potiska na klupi.`,
                    }"
                    @mouseenter="showMessage"
                  >
                    <i class="fas fa-circle-info"></i> </sup
                ></span>
              </template>
            </CheckBoxField>

            <CheckBoxField
              :error="errors?.isUnilateral"
              v-model="formData.isUnilateral"
              label-id="isUnilateral"
              title="izvodi se jednostrano"
            />
          </div>
        </div>
        <div class="form-section">
          <ExerciseMuscleSelectorField
            v-model:primary="formData.primaryGroup"
            v-model:secondaries="formData.seconderyGroups"
            :error="errors?.primaryGroup || errors?.seconderyGroups"
          />
          <InputField
            label-id="videoUrl"
            title="link to video prikaza vežbe"
            v-model="formData.videoUrl"
            :error="errors?.videoUrl"
          />
          <div class="weight-container">
            <CheckBoxField
              :error="errors?.useWeight"
              v-model="formData.useWeight"
              label-id="useWeight"
              title="koristi tegove"
            />
            <CheckBoxField
              v-if="formData.useWeight"
              :error="errors?.isUseMultiple_weights"
              v-model="formData.isUseMultiple_weights"
              label-id="isUseMultiple_weights"
              title="koristi više tegova"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions-section>
      <div class="bottom-section">
        <div class="form-action-btns-container">
          <button type="button" :disabled="!isDirty" @click="resetForm">očisti</button>
          <button type="submit">{{ titleBtn }}</button>
        </div>
        <AuthFormErrorMessage
          v-if="errorMsg"
          custom-class="response-error"
          :message="errorMsg"
        ></AuthFormErrorMessage>
      </div>
    </template>
  </FormLayout>
</template>
<style scoped>
.special {
  width: fit-content;
}
sup {
  color: var(--blue-500);
  &:hover {
    color: var(--blue);
  }
}
.type-container {
  p {
    &::first-letter {
      text-transform: capitalize;
    }
    margin-bottom: 5px;
  }
  margin-bottom: 45px;
  position: relative;
  .fields-container {
    padding-left: 10px;
  }
  .def {
    padding-left: 5px;
  }
}

.top-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow: hidden;
  .form-section {
    overflow: auto-y;
    flex: 1;
  }
}

@media screen and (min-width: 601px) {
  .type-container {
    .fields-container {
      padding-left: 10px;
      display: flex;
      > * {
        flex: 1;
      }
    }
    .def {
      padding-left: 5px;
    }
  }
}
@media screen and (min-width: 769px) {
  .other-params-container {
    display: flex;
    flex-wrap: wrap;
    > * {
      flex-basis: 100%;
    }
  }
  .weight-container {
    display: flex;
    > * {
      flex: 1;
    }
  }
}
@media screen and (min-width: 1025px) {
  .top-section {
    flex-direction: row;
  }
  .other-params-container {
    align-items: flex-start;
  }
  .type-container {
    .fields-container {
      gap: 50px;
      > * {
        flex: 0;
      }
    }
  }
}

@media screen and (min-width: 1284px) {
  .other-params-container {
    > * {
      flex-basis: 50%;
    }
    .test {
      position: relative;
      flex-basis: fit-content;
    }
  }
}
</style>
