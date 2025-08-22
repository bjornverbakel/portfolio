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

      <!-- Snap section indicator -->
      <transition name="fade-opacity" mode="out-in">
        <SnapIndicator :activeSection="activeSection" />
      </transition>
    </div>

    <header
      class="flex flex-row gap-6 sticky top-0 z-10 mix-blend-difference items-center"
      :style="
        headerBlurred
          ? { '-webkit-backdrop-filter': 'blur(25px)', 'backdrop-filter': 'blur(25px)' }
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
      <Transition name="fade-opacity" mode="out-in">
        <div v-if="showHeaderNav" class="mix-blend-difference">
          <Nav
            :activeSection="activeSection"
            :horizontal="true"
            @navClick="
              (section) => {
                backdropState = 'content';
                activeSection = section.toLowerCase();
              }
            "
          />
        </div>
      </Transition>
    </header>

    <main class="flex flex-row">
      <Transition name="fade-opacity" mode="out-in">
        <div
          v-show="backdropState === 'header' || isDesktop"
          class="m-16 hidden flex-col gap-1 mix-blend-difference fixed w-fit lg:flex"
        >
          <div class="flex mix-blend-difference gap-1">
            <div class="bg-[var(--white)] w-1"></div>
            <div class="bg-[var(--white)] w-full p-1 pl-3 pr-3">
              <span class="mix-blend-difference text-xl"
                >Front-end Developer
              </span>
            </div>
          </div>
          <div
            class="border-[var(--white)] border-solid border-4 mix-blend-difference"
          >
            <Nav
              @navClick="
                (section) => {
                  backdropState = 'content';
                  activeSection = section.toLowerCase();
                }
              "
              :activeSection="activeSection"
            />
          </div>
        </div>
      </Transition>
      <Transition name="fade-color" mode="out-in">
        <div id="contentWrapper"
          v-if="activeSection && backdropState === 'content'"
          :class="[
            'justify justify-start flex-col flex w-full items-center',
            { 'm-8': !isDesktop }
            ]"
          :key="activeSection"
        >
          <component :is="activeComponent" />
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
      @navClick="
        (section) => {
          backdropState = 'content';
          activeSection = section.toLowerCase();
        }
      "
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
    }, 500);
    // After the same transition delay, enable the blur on the header
    blurTimer = setTimeout(() => {
      headerBlurred.value = true;
      blurTimer = null;
    }, 500);
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
</script>

<style>
/* COLOR instead of OPACITY for fade looks better due to mix blend mode, use where possible instead of fade-opacity */
.fade-color-enter-active {
  transition: color 0.2s ease-in;
}
.fade-color-leave-active {
  transition: color 0.2s ease-out;
}
.fade-color-enter-from,
.fade-color-leave-to {
  color: var(--black);
}

.fade-opacity-enter-active {
  transition: opacity 0.2s ease-in;
}
.fade-opacity-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-opacity-enter-from,
.fade-opacity-leave-to {
  opacity: 0;
}
</style>
