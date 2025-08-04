<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";
import { useDesktopDetection } from "../composables/useDesktopDetection";

const props = defineProps({
  backdropState: String
});

// Use desktop detection composable
const { isDesktop } = useDesktopDetection();

const logoRef = ref(null);
const isScrolled = ref(false); // Track if user has scrolled past threshold
const scrollTimeout = ref(null); // Timeout for scroll end detection
const emit = defineEmits(["height", "scrolling", "logoClick"]);

// Use the height emitter composable
const { updateHeight } = useEmitHeight(logoRef, emit, "height");

// Computed property to determine logo state based on screen size and navigation state
const logoShouldBeSmall = computed(() => {
  if (isDesktop.value) {
    // On desktop, use scroll-based behavior
    return isScrolled.value;
  } else {
    // On mobile, use navigation state
    return props.backdropState === 'content';
  }
});

// Watch for state changes and update height
watch(logoShouldBeSmall, () => {
  setTimeout(updateHeight, 50);
});

// Optimized scroll completion check with cleanup
let scrollCheckId = null;

// Handle logo click
function handleLogoClick() {
  // Cancel any existing scroll check
  if (scrollCheckId) {
    cancelAnimationFrame(scrollCheckId);
  }

  // First, scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Monitor scroll position with cleanup
  function checkScrollComplete() {
    if (window.scrollY <= 5) {
      emit("logoClick"); // Emit when scroll is complete
      scrollCheckId = null;
    } else {
      scrollCheckId = requestAnimationFrame(checkScrollComplete);
    }
  }

  scrollCheckId = requestAnimationFrame(checkScrollComplete);
}

// Handle scroll events to change logo state (only for desktop)
function handleScroll() {
  // Only apply scroll-based behavior on desktop
  if (!isDesktop.value) return;
  
  // Clear existing timeout and set new one
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  
  // Set timeout to detect scroll end
  scrollTimeout.value = setTimeout(() => {
    emit("scrolling", false);
  }, 150); // 150ms delay after scroll stops
  
  const scrollY = window.scrollY;
  const scrollThreshold = 50; // Threshold for switching states
  
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
  // Cancel any pending scroll check
  if (scrollCheckId) {
    cancelAnimationFrame(scrollCheckId);
  }
});
</script>

<template>
  <div id="logo" class="flex m-8 z-10" ref="logoRef">
    <img 
      draggable="false" 
      src="/logo.svg" 
      alt="Logo" 
      :class="{ 
        'h-[50px] md:h-[100px]': logoShouldBeSmall, 
        'h-[300px]': !logoShouldBeSmall 
      }"
      class="transition-all duration-500 ease btn"
      @click="handleLogoClick"
    />
  </div>
</template>

<style scoped>
#logo {
  -webkit-user-select: none;
  user-select: none;
  width: -webkit-fill-available;
  max-height: 300px;
}
</style>