import { onMounted, onUnmounted } from 'vue'

export default function useClickOutside(target, callback, excludesRefs = []) {
  function clickHandler(target, e) {
    if (!target?.value) return
    if (![...excludesRefs, target].some((ref) => ref.value.contains(e.target))) {
      callback(e)
    }
  }

  onMounted(() => {
    document.addEventListener('click', (e) => {
      clickHandler(target, e)
    })
  })
  onUnmounted(() => {
    document.removeEventListener('click', (e) => clickHandler(target, e))
  })
}
