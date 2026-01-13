import { onMounted, onBeforeUnmount } from 'vue'

export function useEmitHeight(refEl, emit, eventName = 'height') {
  let resizeObserver = null

  function updateHeight() {
    if (refEl.value) {
      const el = refEl.value
      const style = window.getComputedStyle(el)
      const marginTop = parseInt(style.marginTop, 10)
      const marginBottom = parseInt(style.marginBottom, 10)
      emit(eventName, el.offsetHeight + marginTop + marginBottom)
      // if (process.env.NODE_ENV === "development") {
      //   console.log(`Emitted ${eventName}:`, el.offsetHeight + marginTop + marginBottom);
      // }
    }
  }

  onMounted(() => {
    // Initial height calculation
    updateHeight()

    // Listen for font loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        // Recalculate height after fonts are loaded
        setTimeout(updateHeight, 50) // Small delay to ensure layout is complete
      })
    }

    // Also listen for window load as fallback
    if (document.readyState === 'loading') {
      window.addEventListener('load', updateHeight)
    }

    // Set up ResizeObserver to watch for element size changes
    if (refEl.value && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight()
      })
      resizeObserver.observe(refEl.value)
    }

    window.addEventListener('resize', updateHeight)
  })
  // Clean up listeners and observer on component unmount
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateHeight)
    window.removeEventListener('load', updateHeight)

    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })

  return { updateHeight }
}
