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
    class="fixed top-0 left-0 h-full w-full bg-[var(--black)] transform transition-transform duration-300 ease-in-out z-20 md:hidden"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Menu content -->
    <Nav />
  </div>
</template>