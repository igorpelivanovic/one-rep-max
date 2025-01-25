import { watch, ref } from 'vue'

const useIntersectionObserver = ({ target, options, fn }) => {
  let observer = ref(null)
  const initObserver = () => {
    if (!target.value) return
    if (observer.value) {
      observer.value.disconnect()
    }
    observer.value = new IntersectionObserver(fn, options.value)
    observer.value.observe(target.value)
  }
  watch([target, options], () => {
    console.log(target.value)
    initObserver()
  })
  return observer
}

export default useIntersectionObserver
