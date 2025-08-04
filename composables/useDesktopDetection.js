import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useDesktopDetection() {
  const isDesktop = ref(false)
  
  // Memoized device detection to avoid expensive operations on each resize
  let cachedIsDesktop = null
  let lastWindowWidth = null

  function detectDesktop() {
    const currentWidth = window.innerWidth
    
    // Only recalculate if window width changed significantly or not cached
    if (cachedIsDesktop === null || Math.abs(currentWidth - lastWindowWidth) > 50) {
      const userAgent = navigator.userAgent.toLowerCase()
      
      // Mobile/tablet detection patterns
      const mobilePatterns = [
        /android/i,
        /webos/i,
        /iphone/i,
        /ipad/i,
        /ipod/i,
        /blackberry/i,
        /windows phone/i,
        /mobile/i,
        /tablet/i
      ]
      
      const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent))
      const hasLargeScreen = currentWidth >= 768
      
      cachedIsDesktop = !isMobile && hasLargeScreen
      lastWindowWidth = currentWidth
    }
    
    isDesktop.value = cachedIsDesktop
  }

  // Create stable resize handler to prevent memory leaks
  const resizeHandler = () => {
    detectDesktop()
  }

  onMounted(() => {
    detectDesktop()
    window.addEventListener("resize", resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler)
  })

  return {
    isDesktop,
    detectDesktop
  }
}
