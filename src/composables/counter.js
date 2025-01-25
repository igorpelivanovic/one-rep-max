import { ref, onMounted } from 'vue'

const useCounter = ({ start, end, time = 5000 }) => {
  const currentValue = ref(start)
  const initCounter = () => {
    const interval = setInterval(() => {
      if (currentValue.value >= end) {
        clearInterval(interval)
        return
      }
      currentValue.value++
    }, calcInterval())
  }
  const calcInterval = () => {
    return time / (end - start)
  }

  onMounted(() => {
    initCounter()
  })

  return currentValue
}

export { useCounter }
