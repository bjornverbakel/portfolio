<
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Logo from "~/components/Logo.vue";
import Nav from "~/components/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import About from "~/components/About.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
import { Transition } from "vue";

const headerHeight = ref(0);
const contentHeight = ref(0);
const backdropState = ref("header");
const activeSection = ref(null);
const isLogoScrolling = ref(false); // Track logo scrolling state
const logoRef = ref(null); // Reference to the Logo component

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

onMounted(() => {
  window.addEventListener("resize", () => {
    contentHeight.value = window.innerHeight - headerHeight.value;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    contentHeight.value = window.innerHeight - headerHeight.value;
  });
});
</script>

<template>
  <div
    id="app"
    class="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen cursor-none"
  >
    <Backdrop
      :headerHeight="headerHeight"
      :contentHeight="contentHeight"
      :state="backdropState"
      :isScrolling="isLogoScrolling"
    />

    <div id="sidebar" class="flex flex-col row-span-2 mix-blend-difference">
      <div class="line"></div>
    </div>

    <header class="flex flex-row sticky top-0 z-10 mix-blend-difference">
      <Logo
        ref="logoRef"
        @height="setElementHeights"
        @scrolling="handleLogoScrolling"
        @logoClick="handleLogoClick"
      />
    </header>

    <main class="flex flex-row">
      <Nav @navClick="handleNavClick" />
      <article class="m-8 w-60% ml-auto w-[60%] text-justify">
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

    <CustomCursor />
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
</style>
