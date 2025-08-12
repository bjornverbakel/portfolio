<template>
  <div class="snap-indicator" v-if="activeSection">
    <div 
      v-for="(section, index) in getSectionCount()" 
      :key="index"
      class="snap-dot"
      :class="{ 'active': currentSnapSection === index }"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  activeSection: {
    type: String,
    default: null
  }
});

const currentSnapSection = ref(0);

// Section counts for each content type
const sectionCounts = {
  about: 3,
  projects: 1, // Adjust based on your projects component
  contact: 1,  // Adjust based on your contact component
};

// Get section count for current active section
const getSectionCount = () => {
  if (!props.activeSection) return 0;
  return sectionCounts[props.activeSection] || 1;
};

// Reset snap section when changing active section
watch(() => props.activeSection, () => {
  currentSnapSection.value = 0;
});

// Track scroll position to determine current snap section
const scrollHandler = () => {
  if (!props.activeSection) return;
  
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const currentSection = Math.floor(scrollTop / viewportHeight);
  const maxSections = getSectionCount() - 1;
  
  currentSnapSection.value = Math.min(currentSection, maxSections);
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>

<style scoped>
.snap-indicator {
  position: fixed;
  left: calc(clamp(100px, 8vw, 150px) / 2 - 6px);
  top: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.snap-dot {
  width: 8px;
  height: 8px;
  border: 1px solid var(--white);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.snap-dot.active {
  background-color: var(--white);
  transform: scale(1.3);
}
</style>
