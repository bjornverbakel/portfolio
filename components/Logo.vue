<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";

const logoRef = ref(null);
const isScrolled = ref(false); // Track if user has scrolled past threshold
const isScrolling = ref(false); // Track if user is scrolling
const scrollTimeout = ref(null); // Timeout for scroll end detection
const emit = defineEmits(["height", "scrolling", "logoClick"]);

// Use the height emitter composable
const { updateHeight } = useEmitHeight(logoRef, emit, "height");

// Handle logo click
function handleLogoClick() {
  emit("logoClick");
}

// Handle scroll events to change logo state
function handleScroll() {
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
  const scrollThreshold = 100; // Threshold for switching states
  
  // Switch between two states based on scroll position
  isScrolled.value = scrollY > scrollThreshold;
  
  // Trigger height recalculation after state change
  setTimeout(updateHeight, 0);
}

onMounted(() => {
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
      :class="{ 'h-[150px]': isScrolled, 'h-[300px]': !isScrolled }"
      class="transition-all duration-500 ease"
      @click="handleLogoClick"
    />
  </div>
</template>