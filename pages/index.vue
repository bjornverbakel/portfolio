<script setup>
import { ref } from "vue";
import Logo from "~/components/Logo.vue";
import Nav from "~/components/Nav.vue";
import Backdrop from "~/components/Backdrop.vue";
import CustomCursor from "~/components/CustomCursor.vue";
import About from "~/components/About.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
import { Transition } from "vue";

const logoHeight = ref(0);
const navHeight = ref(0);
const backdropState = ref("logo");
const activeSection = ref(null);

function setLogoHeight(h) {
  if (activeSection.value === null) {
    logoHeight.value = h;
  }
}
function setNavHeight(h) {
  if (activeSection.value === null) {
    navHeight.value = h;
  }
}
function handleNavClick(section) {
  backdropState.value = "nav";
  activeSection.value = section.toLowerCase();
}
</script>

<template>
  <div id="app" class="grid grid-cols-[auto_1fr] min-h-screen cursor-none">
    <Backdrop
      :logoHeight="logoHeight"
      :navHeight="navHeight"
      :state="backdropState"
    />

    <div id="sidebar" class="flex flex-col row-span-2 mix-blend-difference">
      <div class="line"></div>
    </div>

    <div class="flex flex-col min-h-screen">
      <header class="flex flex-row">
        <Logo @height="setLogoHeight" />
      </header>

      <main class="flex flex-row flex-grow">
        <Nav @height="setNavHeight" @navClick="handleNavClick" />
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
    </div>

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
