<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  activeSection: String,
});

const emit = defineEmits(["close", "navClick"]);

function closeMenu() {
  emit("close");
}

function handleNavClick(section) {
  // Forward the nav click to parent
  emit("navClick", section);
  // Close the mobile menu after navigation
  closeMenu();
}
</script>

<template>
  <div id="mobile-menu"
    class="fixed top-0 w-full h-full bg-[var(--black)] transform transition-transform duration-300 ease-in-out z-20 md:hidden right-0 sm:right-auto sm:left-0"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full sm:-translate-x-full'"
  >
    <!-- Menu content -->
    <Nav 
      :activeSection="activeSection"
      @navClick="handleNavClick"
    />
  </div>
</template>