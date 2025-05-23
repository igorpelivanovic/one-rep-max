import clearObject from '@/utils/clearObject'
import { ref, computed, watch, reactive } from 'vue'

function useFormValidation({
  values,
  validation = {},
  onSuccess,
  onError = undefined,
  validateAfterSubmit = true,
}) {
  const errorsObj = reactive({})
  const isSubmited = ref(!validateAfterSubmit)
  const isDirty = ref(false)

  const errors = computed(() => (Object.keys(errorsObj).length === 0 ? null : errorsObj))

  Object.keys(values).forEach((fieldKey) => {
    watch(
      () => values[fieldKey],
      () => {
        if (isSubmited.value) {
          validationField(fieldKey)
        }
        if (!isDirty.value) {
          isDirty.value = true
        }
        return
      },
    )
  })

  function onSubmit(e) {
    isSubmited.value = true
    validationFields()
    if (errors.value === null) {
      onSuccess(e)
      return
    }
    if (onError) {
      onError(e)
    }
    return
  }

  function validationField(key) {
    try {
      validation?.[key].forEach((fn) => {
        fn(values[key])
      })
      delete errorsObj[key]
    } catch (e) {
      errorsObj[key] = e
    }
  }

  function validationFields() {
    Object.keys(validation).forEach((key) => {
      validationField(key)
    })
  }

  function reset() {
    isSubmited.value = false
    isDirty.value = false
    clearObject(errorsObj)
  }

  return { errors, onSubmit, reset, isDirty }
}

export default useFormValidation
