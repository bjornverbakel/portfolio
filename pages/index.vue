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
        @height="setElementHeights"
        @scrolling="(scrolling) => isLogoScrolling = scrolling"
        @logoClick="() => { backdropState = 'header'; activeSection = null; }"
      />
    </header>

    <main class="flex flex-row">
      <Transition name="fade" mode="out-in">
        <Nav 
          v-show="backdropState === 'header' || isDesktop"
          @navClick="(section) => { backdropState = 'content'; activeSection = section.toLowerCase(); }" 
          :activeSection="activeSection"
        />
      </Transition>
      <article class="justify justify-center flex w-full">
        <Transition name="fade" mode="out-in">
          <component
            :is="activeComponent"
            :key="activeSection"
          />
        </Transition>
      </article>
    </main>

    <HamburgerMenuIcon 
      :isMobileMenuOpen="isMobileMenuOpen"
      @toggle="() => isMobileMenuOpen = !isMobileMenuOpen"
    />

    <MobileMenu 
      :isOpen="isMobileMenuOpen" 
      :activeSection="activeSection"
      @close="() => isMobileMenuOpen = false" 
      @navClick="(section) => { backdropState = 'content'; activeSection = section.toLowerCase(); }"
    />

    <CustomCursor v-if="isDesktop" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, Transition } from "vue";
import Logo from "~/components/Logo.vue";
import Nav from "~/components/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import About from "~/components/About.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
import MobileMenu from "~/components/MobileMenu.vue";
import HamburgerMenuIcon from "~/components/HamburgerMenuIcon.vue";
import { useDesktopDetection } from "~/composables/useDesktopDetection.js";

const headerHeight = ref(0);
const contentHeight = ref(0);
const backdropState = ref("header");
const activeSection = ref(null);
const isLogoScrolling = ref(false); // Track logo scrolling state
const logoRef = ref(null); // Reference to the Logo component
const isMobileMenuOpen = ref(false); // Track mobile menu state

// Use desktop detection composable
const { isDesktop } = useDesktopDetection();

// Component map for content
const componentMap = {
  about: About,
  projects: Projects,
  contact: Contact,
};

// Computed property for active component
const activeComponent = computed(() => 
  activeSection.value ? componentMap[activeSection.value] || 'div' : 'div'
);

function setElementHeights(h) {
  headerHeight.value = h;
  // Calculate content height as window height minus header height
  contentHeight.value = window.innerHeight - headerHeight.value;
}

// Create stable resize handler to prevent memory leaks
const resizeHandler = () => {
  contentHeight.value = window.innerHeight - headerHeight.value;
};

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

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
