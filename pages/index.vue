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
      class="justify-center flex-col row-span-2 mix-blend-difference hidden sm:flex relative"
    >
      <div class="line"></div>
    </div>

    <header
      class="flex flex-row gap-6 sticky top-0 z-10 mix-blend-difference items-center"
      :style="
        headerBlurred
          ? {
              '-webkit-backdrop-filter': 'blur(25px)',
              'backdrop-filter': 'blur(25px)',
            }
          : null
      "
    >
      <Logo
        ref="logoRef"
        :backdropState="backdropState"
        @height="setElementHeights"
        @scrolling="(scrolling) => (isLogoScrolling = scrolling)"
        @logoClick="
          () => {
            backdropState = 'header';
            activeSection = null;
          }
        "
      />
      <!-- Nav appears in header when in content state -->
      <Transition name="nav-fade" mode="out-in">
        <div v-if="showHeaderNav" class="mix-blend-difference">
          <Nav
            :activeSection="activeSection"
            :horizontal="true"
            @navClick="navigateTo"
          />
        </div>
      </Transition>
    </header>

    <main class="flex flex-row">
      <Transition name="fade-opacity" mode="out-in">
        <div
          class="m-16 flex-col gap-1 mix-blend-difference fixed w-fit flex"
          :class="{
            flex: !isDesktop && backdropState === 'header',
            hidden: !isDesktop && backdropState === 'content',
          }"
        >
          <div class="flex mix-blend-difference gap-1">
            <div class="bg-[var(--white)] w-1"></div>
            <div class="bg-[var(--white)] w-full p-1 pl-3 pr-3">
              <span class="mix-blend-difference text-xl">
                Front-end Developer
              </span>
            </div>
          </div>
          <div
            class="border-[var(--white)] border-solid border-4 mix-blend-difference"
          >
            <Nav @navClick="navigateTo" :activeSection="activeSection" />
          </div>
        </div>
      </Transition>
      <Transition name="section" mode="out-in">
        <div
          id="contentWrapper"
          v-if="activeSection && backdropState === 'content'"
          :class="[
            'justify justify-start flex-col flex w-full items-center m-16 lg:ml-[24.25rem]',
          ]"
          :key="activeSection"
        >
          <component :is="activeComponent" :from-header="enteredFromHeader" />
        </div>
      </Transition>
    </main>

    <HamburgerMenuIcon
      :isMobileMenuOpen="isMobileMenuOpen"
      @toggle="() => (isMobileMenuOpen = !isMobileMenuOpen)"
    />

    <MobileMenu
      :isOpen="isMobileMenuOpen"
      :activeSection="activeSection"
      @close="() => (isMobileMenuOpen = false)"
      @navClick="navigateTo"
    />

    <CustomCursor v-if="isDesktop" />
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  Transition,
} from "vue";
import Logo from "~/components/Logo.vue";
import Nav from "~/components/navigation/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import SnapIndicator from "~/components/SnapIndicator.vue";
import About from "~/components/content/About.vue";
import Projects from "~/components/content/Projects.vue";
import Contact from "~/components/content/Contact.vue";
import MobileMenu from "~/components/navigation/MobileMenu.vue";
import HamburgerMenuIcon from "~/components/navigation/HamburgerMenuIcon.vue";
import { useDesktopDetection } from "~/composables/useDesktopDetection.js";
import { usePreloadProjectImages } from "~/composables/usePreloadProjectImages";

const headerHeight = ref(0);
const contentHeight = ref(0);
const backdropState = ref("header");
const activeSection = ref(null);
const isLogoScrolling = ref(false); // Track logo scrolling state
const logoRef = ref(null); // Reference to the Logo component
const isMobileMenuOpen = ref(false); // Track mobile menu state
const showHeaderNav = ref(false); // Track when to show nav in header
const headerBlurred = ref(false); // Apply blur to header only when backdrop finished animating to content
let blurTimer = null; // timer to toggle blur after transition ends
const enteredFromHeader = ref(false); // set true only when transitioning from header to projects

// Use desktop detection composable
const { isDesktop } = useDesktopDetection();
// Start preloading project images early
usePreloadProjectImages();

// Component map for content
const componentMap = {
  about: About,
  projects: Projects,
  contact: Contact,
};

// Computed property for active component
const activeComponent = computed(() =>
  activeSection.value ? componentMap[activeSection.value] || "div" : "div"
);

// Watch backdropState to control header nav appearance and blur timing
watch(backdropState, (newState) => {
  // Clear any pending timers when state changes
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }

  if (newState === "content") {
    // Ensure blur is OFF while backdrop is animating to content
    headerBlurred.value = false;
    // Delay showing nav until logo/backdrop transition is complete (500ms)
    setTimeout(() => {
      showHeaderNav.value = true;
    }, 750);
    // After the same transition delay, enable the blur on the header
    blurTimer = setTimeout(() => {
      headerBlurred.value = true;
      blurTimer = null;
    }, 750);
  } else {
    // On the way back to header (backdrop moving), remove blur immediately and hide nav
    headerBlurred.value = false;
    showHeaderNav.value = false;
  }
});

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
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }
});

function navigateTo(section) {
  const target = section.toLowerCase();
  const cameFromHeader = backdropState.value === "header";
  backdropState.value = "content";
  activeSection.value = target;
  enteredFromHeader.value = cameFromHeader && target === "projects";
  if (enteredFromHeader.value) {
    // reset after mount so reactivity only affects first render
    setTimeout(() => (enteredFromHeader.value = false), 50);
  }
}
</script>

<style>
/* Nav fade: enter only (instant hide) */
.nav-fade-enter-active {
  transition: opacity 0.2s ease;
}
.nav-fade-enter-from {
  opacity: 0;
}
.nav-fade-enter-to {
  opacity: 1;
}
.nav-fade-leave-active {
  transition: none;
}
.nav-fade-leave-from,
.nav-fade-leave-to {
  opacity: 1;
}

.fade-opacity-enter-active {
  transition:
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.fade-opacity-leave-active {
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
}
.fade-opacity-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.fade-opacity-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Section (content swap) parent transition; descendants opt-in via data attributes */
.section-enter-active [data-fade-color],
.section-leave-active [data-fade-color] {
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}
.section-enter-from [data-fade-color] {
  color: var(--black);
  transform: translateY(-4px);
}
.section-leave-to [data-fade-color] {
  color: var(--black);
  transform: translateY(-4px);
}

.section-enter-active [data-fade-opacity],
.section-leave-active [data-fade-opacity] {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.section-enter-from [data-fade-opacity] {
  opacity: 0;
  transform: translateY(-4px);
}
.section-leave-to [data-fade-opacity] {
  opacity: 0;
  transform: translateY(-4px);
}

/* Background + color fade (e.g., skill cards) */
.section-enter-active [data-fade-bg],
.section-leave-active [data-fade-bg] {
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}
.section-enter-from [data-fade-bg] {
  background-color: var(--black);
  color: var(--black);
  transform: translateY(-4px);
}
.section-leave-to [data-fade-bg] {
  background-color: var(--black);
  color: var(--black);
  transform: translateY(-4px);
}
</style>
