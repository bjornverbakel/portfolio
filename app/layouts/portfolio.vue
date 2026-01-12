<template>
  <SpeedInsights />
  <Analytics/>

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
        @logoClick="handleLogoClick"
      />
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
          class="m-8 sm:m-16 flex-col gap-1 mix-blend-difference fixed w-fit flex"
          :class="{
            flex: !isDesktop && backdropState === 'header',
            hidden: !isDesktop && backdropState === 'content',
          }"
        >
          <div class="flex mix-blend-difference gap-1">
            <div class="bg-[var(--white)] w-1"></div>
            <div class="bg-[var(--white)] w-full pl-2 pr-2">
              <span class="text-sm mb-2 uppercase mix-blend-difference">  
                UX/UI • Front-end Dev
              </span>
            </div>
          </div>
          <div
            class="border-[var(--white)] border-solid border-4 mix-blend-difference"
          >
            <Nav :activeSection="activeSection" @navClick="navigateTo" />
          </div>
        </div>
      </Transition>
      <Transition name="section" mode="out-in">
        <div
          id="contentWrapper"
          v-if="activeSection && backdropState === 'content'"
          :class="[
            'justify justify-start flex-col flex w-full m-8 sm:m-16 lg:ml-[24.25rem]',
          ]"
          :key="activeSection"
        >
          <NuxtPage />
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
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { Analytics } from '@vercel/analytics/nuxt'
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  Transition,
} from "vue";
import { useRoute, useRouter } from 'vue-router';
import Logo from "~/components/Logo.vue";
import Nav from "~/components/navigation/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import MobileMenu from "~/components/navigation/MobileMenu.vue";
import HamburgerMenuIcon from "~/components/navigation/HamburgerMenuIcon.vue";
import { useDesktopDetection } from "~/composables/useDesktopDetection.js";

const route = useRoute();
const router = useRouter();

const headerHeight = ref(0);
const contentHeight = ref(0);
const backdropState = ref("header");
const activeSection = ref(null);
const isLogoScrolling = ref(false);
const logoRef = ref(null);
const isMobileMenuOpen = ref(false);
const showHeaderNav = ref(false);
const headerBlurred = ref(false);
let blurTimer = null;

const { isDesktop } = useDesktopDetection();

// Route to section mapping
const routeToSection = {
  '/': null,
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact'
};

const sectionToRoute = {
  about: '/about',
  projects: '/projects',
  contact: '/contact'
};

// Initialize state based on current route
function initializeFromRoute() {
  const section = routeToSection[route.path];
  if (section) {
    activeSection.value = section;
    backdropState.value = 'content';
  } else {
    activeSection.value = null;
    backdropState.value = 'header';
  }
}

// Watch route changes
watch(() => route.path, (newPath) => {
  const section = routeToSection[newPath];
  if (section) {
    const cameFromHeader = backdropState.value === "header";
    backdropState.value = "content";
    activeSection.value = section;
  } else {
    backdropState.value = 'header';
    activeSection.value = null;
  }
});

// Watch backdropState to control header nav appearance and blur timing
watch(backdropState, (newState) => {
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }

  if (newState === "content") {
    headerBlurred.value = false;
    setTimeout(() => {
      showHeaderNav.value = true;
    }, 750);
    blurTimer = setTimeout(() => {
      headerBlurred.value = true;
      blurTimer = null;
    }, 750);
  } else {
    headerBlurred.value = false;
    showHeaderNav.value = false;
  }
});

function setElementHeights(h) {
  headerHeight.value = h;
  contentHeight.value = window.innerHeight - headerHeight.value;
}

function handleLogoClick() {
  router.push('/');
}

// Updated navigateTo function that uses router
function navigateTo(section) {
  const target = section.toLowerCase();
  const route = sectionToRoute[target];
  
  if (route) {
    router.push(route);
  }
}

const resizeHandler = () => {
  contentHeight.value = window.innerHeight - headerHeight.value;
};

onMounted(() => {
  initializeFromRoute();
  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }
});
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
