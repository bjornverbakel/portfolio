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

function setElementHeights(h) {
  headerHeight.value = h;
  // Calculate content height as window height minus header height
  contentHeight.value = window.innerHeight - headerHeight.value;
}

function handleNavClick(section) {
  backdropState.value = "content";
  activeSection.value = section.toLowerCase();
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
    />

    <div id="sidebar" class="flex flex-col row-span-2 mix-blend-difference">
      <div class="line"></div>
    </div>

    <header class="flex flex-row sticky top-0 z-10 mix-blend-difference">
      <Logo @height="setElementHeights" />
    </header>

    <main class="flex flex-row">
      <Nav @navClick="handleNavClick" />
      <article class="m-8 w-full">
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
.fade-enter-active,
.fade-leave-active {
  transition: color 0.2s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  color: var(--black);
}
</style>
