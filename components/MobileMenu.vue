<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function closeMenu() {
  emit("close");
}
</script>

<template>
  <div id="mobile-menu"
    class="fixed top-0 w-64 sm:w-80 h-full bg-[var(--black)] transform transition-transform duration-300 ease-in-out z-20 md:hidden right-0 sm:right-auto sm:left-0"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full sm:-translate-x-full'"
  >
    <!-- Menu content -->
    <Nav />
  </div>
</template>