<script setup>
import { ref } from 'vue'
import Logo from '~/components/Logo.vue'
import Nav from '~/components/Nav.vue'
import Backdrop from '~/components/Backdrop.vue'

const logoHeight = ref(0)
const navHeight = ref(0)
const backdropState = ref('logo')

function setLogoHeight(h) {
  logoHeight.value = h
}
function setNavHeight(h) {
  navHeight.value = h
}
function handleNavClick() {
  backdropState.value = 'nav'
}
</script>

<template>
  <div id="app">
    <Backdrop :logoHeight="logoHeight" :navHeight="navHeight" :state="backdropState" />
    <aside class="flex flex-col mix-blend-difference">
      <div class="line"></div>
    </aside>
    <main class="flex flex-col flex-1">
      <Logo @height="setLogoHeight" />
      <Nav @height="setNavHeight" @navClick="handleNavClick" />
    </main>
  </div>
</template>
