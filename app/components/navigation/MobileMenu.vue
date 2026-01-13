<script setup>
import Nav from '~/components/navigation/Nav.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  activeSection: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close', 'navClick'])

function closeMenu() {
  emit('close')
}

function handleNavClick(section) {
  // Forward the nav click to parent
  emit('navClick', section)
  // Close the mobile menu after navigation
  closeMenu()
}
</script>

<template>
  <div
id="mobile-menu"
    class="fixed top-0 w-fit h-full bg-[var(--black)] transform transition-transform duration-300 ease-in-out z-20 lg:hidden right-0 sm:right-auto sm:left-0"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full sm:-translate-x-full'"
  >
    <!-- Menu content -->
    <Nav 
      :active-section="activeSection"
      @nav-click="handleNavClick"
    />
  </div>
</template>