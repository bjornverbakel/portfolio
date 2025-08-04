<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Logo from "~/components/Logo.vue";
import Nav from "~/components/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import About from "~/components/About.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
import MobileMenu from "~/components/MobileMenu.vue";
import HamburgerMenuIcon from "~/components/HamburgerMenuIcon.vue";
import { Transition } from "vue";

const headerHeight = ref(0);
const contentHeight = ref(0);
const backdropState = ref("header");
const activeSection = ref(null);
const isLogoScrolling = ref(false); // Track logo scrolling state
const logoRef = ref(null); // Reference to the Logo component
const isMobileMenuOpen = ref(false); // Track mobile menu state
const isDesktop = ref(false); // Track if user is on desktop device

function setElementHeights(h) {
  headerHeight.value = h;
  // Calculate content height as window height minus header height
  contentHeight.value = window.innerHeight - headerHeight.value;
}

function handleNavClick(section) {
  backdropState.value = "content";
  activeSection.value = section.toLowerCase();
}

function handleLogoScrolling(scrolling) {
  isLogoScrolling.value = scrolling;
}

function handleLogoClick() {
  // First, scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Wait for scroll to complete, then reset state
  // Monitor scroll position to know when we've reached the top
  function checkScrollComplete() {
    if (window.scrollY <= 5) {
      // Allow small tolerance
      // Reset to initial state after reaching top
      backdropState.value = "header";
      activeSection.value = null;
    } else {
      // Continue checking if we haven't reached the top yet
      requestAnimationFrame(checkScrollComplete);
    }
  }

  // Start checking scroll position
  requestAnimationFrame(checkScrollComplete);
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function detectDesktop() {
  // Check user agent for desktop operating systems and devices
  const userAgent = navigator.userAgent.toLowerCase();
  
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
  ];
  
  // Check if any mobile pattern matches
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  
  // Also check screen width as fallback for small screens
  const hasLargeScreen = window.innerWidth >= 768;
  
  // Consider desktop if not mobile and has reasonable screen size
  isDesktop.value = !isMobile && hasLargeScreen;
}

onMounted(() => {
  detectDesktop();
  window.addEventListener("resize", () => {
    contentHeight.value = window.innerHeight - headerHeight.value;
    detectDesktop();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    contentHeight.value = window.innerHeight - headerHeight.value;
    detectDesktop();
  });
});
</script>

<template>
  <div
    id="app"
    class="grid grid-cols-1 sm:grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen"
    :class="{ 'cursor-none': isDesktop }"
  >
    <Backdrop
      :headerHeight="headerHeight"
      :contentHeight="contentHeight"
      :state="backdropState"
      :isScrolling="isLogoScrolling"
    />

    <div
      id="sidebar"
      class="justify-center flex-col row-span-2 mix-blend-difference hidden sm:flex"
    >
      <div class="line"></div>
    </div>

    <header class="flex flex-row sticky top-0 z-10 mix-blend-difference">
      <Logo
        ref="logoRef"
        :backdropState="backdropState"
        :isDesktop="isDesktop"
        @height="setElementHeights"
        @scrolling="handleLogoScrolling"
        @logoClick="handleLogoClick"
      />
    </header>

    <main class="flex flex-row">
      <Transition name="fade" mode="out-in">
        <Nav 
          v-show="backdropState === 'header' || isDesktop"
          @navClick="handleNavClick" 
          :activeSection="activeSection"
        />
      </Transition>
      <article class="justify justify-center flex w-full">
        <Transition name="fade" mode="out-in">
          <component
            :is="
              activeSection === 'about'
                ? About
                : activeSection === 'projects'
                  ? Projects
                  : activeSection === 'contact'
                    ? Contact
                    : 'div'
            "
            :key="activeSection"
          />
        </Transition>
      </article>
    </main>

    <HamburgerMenuIcon 
      :isMobileMenuOpen="isMobileMenuOpen"
      @toggle="toggleMobileMenu"
    />

    <MobileMenu 
      :isOpen="isMobileMenuOpen" 
      :activeSection="activeSection"
      @close="closeMobileMenu" 
      @navClick="handleNavClick"
    />

    <CustomCursor v-if="isDesktop" />
  </div>
</template>

<style>
/* COLOR instead of OPACITY for fade due to mix blend mode */
.fade-enter-active {
  transition: color 0.2s ease-in;
}

.fade-leave-active {
  transition: color 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  color: var(--black);
}

/* Ensure buttons have pointer cursor on non-desktop devices */
#app:not(.cursor-none) .btn {
  cursor: pointer;
}
</style>
