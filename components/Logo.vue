<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";

const logoRef = ref(null);
const logoHeight = ref(null); // Actual height in pixels
const baseHeight = ref(null); // Store the original height
const isScrolling = ref(false); // Track if user is scrolling
const scrollTimeout = ref(null); // Timeout for scroll end detection
const emit = defineEmits(["height", "scrolling", "logoClick"]);

// Use the height emitter composable
const { updateHeight } = useEmitHeight(logoRef, emit, "height");

// Handle logo click
function handleLogoClick() {
  emit("logoClick");
}

// Handle scroll events to change logo height
function handleScroll() {
  if (!baseHeight.value) return;
  
  // Set scrolling state and emit it
  if (!isScrolling.value) {
    isScrolling.value = true;
    emit("scrolling", true);
  }
  
  // Clear existing timeout and set new one
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  
  // Set timeout to detect scroll end
  scrollTimeout.value = setTimeout(() => {
    isScrolling.value = false;
    emit("scrolling", false);
  }, 150); // 150ms delay after scroll stops
  
  const scrollY = window.scrollY;
  const maxScroll = 150; // Adjust this value to control how quickly the logo shrinks
  
  // Calculate height: full height at top, 50% height when fully scrolled
  const minHeightRatio = 0.2;
  const maxHeightRatio = 1;
  const heightRatio = Math.max(minHeightRatio, maxHeightRatio - (scrollY / maxScroll) * (maxHeightRatio - minHeightRatio));
  
  logoHeight.value = Math.round(baseHeight.value * heightRatio);
  
  // Trigger height recalculation after height change
  setTimeout(updateHeight, 0);
}

onMounted(() => {
  // Wait for the logo to be rendered and get its natural height
  setTimeout(() => {
    if (logoRef.value) {
      const img = logoRef.value.querySelector('img');
      if (img) {
        // Store the original height
        baseHeight.value = img.offsetHeight;
        logoHeight.value = baseHeight.value;
      }
    }
  }, 100);
  
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});
</script>

<template>
  <div id="logo" class="flex m-8 z-10" ref="logoRef">
    <img 
      draggable="false" 
      src="/logo.svg" 
      alt="Logo" 
      :style="{ 
        height: logoHeight ? `${logoHeight}px` : 'auto',
        transition: 'height 0.2s ease-out'
      }"
      @click="handleLogoClick"
    />
  </div>
</template>