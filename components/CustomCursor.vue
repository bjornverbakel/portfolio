<template>
  <div>
    <!-- Outer cursor (border) -->
    <div
      class="custom-cursor-outer mix-blend-difference"
      :class="{ 'hovering-btn': isHoveringBtn, clicking: isClicking }"
      :style="{
        left: outerX + 'px',
        top: outerY + 'px',
      }"
    ></div>
    <!-- Inner cursor -->
    <div
      class="custom-cursor-inner mix-blend-difference"
      :class="{
        'hovering-btn': isHoveringBtn,
        clicking: isClicking,
      }"
      :style="{
        left: cursorX + 'px',
        top: cursorY + 'px',
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const cursorX = ref(0);
const cursorY = ref(0);
const outerX = ref(0);
const outerY = ref(0);
const isHoveringBtn = ref(false);
const isClicking = ref(false);

function handleMouseMove(e) {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
}

function handleMouseDown() {
  isClicking.value = true;
}
function handleMouseUp() {
  isClicking.value = false;
}

function handleMouseOver(e) {
  if (e.target.classList?.contains("btn")) {
    isHoveringBtn.value = true;
  }
}
function handleMouseOut(e) {
  if (e.target.classList?.contains("btn")) {
    isHoveringBtn.value = false;
  }
}

let animationFrame;
function animateOuterCursor() {
  // Move outer cursor towards inner cursor
  outerX.value += (cursorX.value - outerX.value) * 0.15; // smaller = slower
  outerY.value += (cursorY.value - outerY.value) * 0.15;
  animationFrame = requestAnimationFrame(animateOuterCursor);
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  // Initialize outer cursor position
  outerX.value = cursorX.value;
  outerY.value = cursorY.value;
  animateOuterCursor();
});
onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mousedown", handleMouseDown);
  window.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("mouseover", handleMouseOver);
  document.removeEventListener("mouseout", handleMouseOut);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.custom-cursor-inner {
  position: fixed;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--white);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: transform 0.2s;
}
.custom-cursor-inner.hovering-btn {
  transform: translate(-50%, -50%) scale(2.2);
}
.custom-cursor-inner.clicking {
  transform: translate(-50%, -50%) scale(0.6);
}

.custom-cursor-outer {
  position: fixed;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--white);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9998;
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
