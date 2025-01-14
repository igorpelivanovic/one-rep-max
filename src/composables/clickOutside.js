import { onMounted, onUnmounted } from 'vue'

export default function useClickOutside(target, callback, excludesRefs = []) {
  function clickHandler(e) {
    if (!target.value) return
    if (![...excludesRefs, target.value].some((ref) => ref.contains(e.target))) {
      callback.call()
    }
  }
  onMounted(() => {
    document.addEventListener('click', clickHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', clickHandler)
  })
}
