<script setup>
import { ref } from 'vue'
import Logo from '~/components/Logo.vue'
import Nav from '~/components/Nav.vue'
import Backdrop from '~/components/Backdrop.vue'
import CustomCursor from '~/components/CustomCursor.vue'
import About from '~/components/About.vue'
import Projects from '~/components/Projects.vue'
import Contact from '~/components/Contact.vue'
import { Transition } from 'vue'

const logoHeight = ref(0)
const navHeight = ref(0)
const backdropState = ref('logo')
const activeSection = ref('about') // Add this

function setLogoHeight(h) {
  logoHeight.value = h
}
function setNavHeight(h) {
  navHeight.value = h
}
function handleNavClick(section) { // Modified to accept section
  backdropState.value = 'nav'
  activeSection.value = section.toLowerCase()
}
</script>

<template>
  <div id="app">
    <Backdrop :logoHeight="logoHeight" :navHeight="navHeight" :state="backdropState" />
    <div id="sidebar" class="flex flex-col mix-blend-difference">
      <div class="line"></div>
    </div>
    <main class="flex flex-col flex-1">
      <Logo @height="setLogoHeight" />
      <div class="flex flex-row flex-grow">
        <Nav @height="setNavHeight" @navClick="handleNavClick" />
        <article class="m-8">
          <Transition name="fade" mode="out-in">
            <component :is="activeSection === 'about' ? About : 
                              activeSection === 'projects' ? Projects : 
                              Contact"
            />
          </Transition>
        </article>
      </div>
    </main>
    <CustomCursor />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
