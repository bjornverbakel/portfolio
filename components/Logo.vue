<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const logoRef = ref(null)
const emit = defineEmits(['height'])

function updateHeight() {
  if (logoRef.value) {
    const el = logoRef.value
    const style = window.getComputedStyle(el)
    const marginTop = parseInt(style.marginTop, 10)
    const marginBottom = parseInt(style.marginBottom, 10)
    emit('height', el.offsetHeight + marginTop + marginBottom)
  }
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateHeight)
})
</script>

<template>
  <div id="logo" class="flex mix-blend-difference m-8" ref="logoRef">
    <img src="/logo.svg" alt="Logo" />
  </div>
</template>