<template>
  <div v-show="!isCursorHidden">
    <!-- Outer cursor (border) -->
    <div
      class="custom-cursor-outer"
      :class="{ 'hovering-btn': isHoveringBtn, 'clicking': isClicking }"
      :style="{
        left: outerX + 'px',
        top: outerY + 'px',
      }"
    />
    <!-- Inner cursor -->
    <div
      class="custom-cursor-inner"
      :class="{
        'hovering-btn': isHoveringBtn,
        'clicking': isClicking,
      }"
      :style="{
        left: cursorX + 'px',
        top: cursorY + 'px',
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const outerX = ref(0)
const outerY = ref(0)
const isHoveringBtn = ref(false)
const isClicking = ref(false)
const isCursorHidden = ref(false)

function handleMouseMove(e) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

function handleMouseDown() {
  isClicking.value = true
}
function handleMouseUp() {
  isClicking.value = false
}

function handleMouseOver(e) {
  const target = e.target
  // Hide custom cursor and show native cursor on inputs, textareas, or specific class
  if (
    target.tagName === 'INPUT'
    || target.tagName === 'TEXTAREA'
    || target.classList?.contains('native-cursor')
    || target.closest('.native-cursor')
  ) {
    isCursorHidden.value = true
    document.body.style.cursor = 'auto'
  }
  else {
    isCursorHidden.value = false
    document.body.style.cursor = 'none'
  }

  if (target.classList?.contains('btn') || target.closest('.btn')) {
    isHoveringBtn.value = true
  }
}
function handleMouseOut(e) {
  const target = e.target
  // Logic to potentially unhide if leaving a specific element handled by mouseover flow
  // Usually mouseover on the new element handles the state, but ensuring body cursor resets is good practice
  if (
    target.tagName === 'INPUT'
    || target.tagName === 'TEXTAREA'
    || target.classList?.contains('native-cursor')
    || target.closest('.native-cursor')
  ) {
    isCursorHidden.value = false
    document.body.style.cursor = 'none'
  }

  if (target.classList?.contains('btn') || target.closest('.btn')) {
    isHoveringBtn.value = false
  }
}

let animationFrame
function animateOuterCursor() {
  // Move outer cursor towards inner cursor
  outerX.value += (cursorX.value - outerX.value) * 0.15 // smaller = slower
  outerY.value += (cursorY.value - outerY.value) * 0.15
  animationFrame = requestAnimationFrame(animateOuterCursor)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseout', handleMouseOut)
  // Ensure default state
  document.body.style.cursor = 'none'

  // Initialize outer cursor position
  outerX.value = cursorX.value
  outerY.value = cursorY.value
  animateOuterCursor()
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseout', handleMouseOut)

  // Reset body cursor
  document.body.style.cursor = 'auto'
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.custom-cursor-inner,
.custom-cursor-outer {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: var(--white);
}

.custom-cursor-inner {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}
.custom-cursor-inner.hovering-btn {
  transform: translate(-50%, -50%) scale(2.2);
}
.custom-cursor-inner.clicking {
  transform: translate(-50%, -50%) scale(0.6);
}

.custom-cursor-outer {
  width: 32px;
  height: 32px;
  border: 2px solid var(--white);
  transition:
    transform 0.2s,
    border-color 0.2s;
  background: transparent;
}
.custom-cursor-outer.hovering-btn {
  border-color: transparent;
}
.custom-cursor-outer.clicking {
  transform: translate(-50%, -50%) scale(1.2);
}
</style>
