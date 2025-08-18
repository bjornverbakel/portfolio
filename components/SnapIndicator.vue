<template>
  <!-- <div class="snap-indicator" v-if="activeSection && dotCount > 0">
    <div
      v-for="n in dotCount"
      :key="n - 1"
      class="snap-dot"
      :class="{ active: (n - 1) === activeIndex }"
      aria-hidden="true"
    />
  </div> -->
</template>
<!-- 
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  activeSection: {
    type: String,
    default: null,
  },
})

// Reactive state
const dotCount = ref(0)
const activeIndex = ref(0)

// Internal refs
let sections = [] /** @type {HTMLElement[]} */
let timer = null /** @type {number | null} */

function clearSections() {
  sections = []
}

function setSections(newSections) {
  sections = newSections
  dotCount.value = sections.length
  updateActiveIndexFromViewport(sections)
}

function updateActiveIndexFromViewport(sections) {
  // Choose the section whose center is closest to viewport center
  const viewportCenter = window.innerHeight / 2
  let bestIdx = 0
  let bestDist = Infinity
  sections.forEach((el, idx) => {
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const dist = Math.abs(center - viewportCenter)
    if (dist < bestDist) {
      bestDist = dist
      bestIdx = idx
    }
  })
  activeIndex.value = bestIdx
}

function findSectionsInActiveArticle() {
  // Prefer sections under the current <article> (active content)
  const article = document.querySelector('article')
  const nodeList = article
    ? article.querySelectorAll('.snap-section')
    : document.querySelectorAll('article .snap-section')
  return Array.from(nodeList)
}

function refreshOnceAfterDelay(delayMs = 400) {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(() => {
    timer = null
    const newSections = findSectionsInActiveArticle()
    setSections(newSections)
  }, delayMs)
}

// React to nav/content changes
watch(
  () => props.activeSection,
  (newVal) => {
    if (newVal) {
      // Reset and refresh once after the article transition
      clearSections()
      dotCount.value = 0
      activeIndex.value = 0
      refreshOnceAfterDelay(400)
    } else {
      dotCount.value = 0
      activeIndex.value = 0
      clearSections()
    }
  }
)

// Keep active dot in sync during manual scrolls (fallback/assist to IO)
function onScroll() {
  if (!sections.length) return
  updateActiveIndexFromViewport(sections)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  // Initial mount: if a section is already active, schedule a refresh
  if (props.activeSection) {
    refreshOnceAfterDelay(0)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (timer) clearTimeout(timer)
  clearSections()
})

// Expose to template
// dotCount, activeIndex are already refs
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
</style> -->
