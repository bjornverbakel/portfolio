<script setup>
const props = defineProps({
  isMobileMenuOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['toggle']);

function toggleMobileMenu() {
  emit('toggle');
}
</script>

<template>
  <button
    @click="toggleMobileMenu"
    class="btn fixed z-50 top-8 right-8 sm:top-8 sm:left-8 sm:right-auto md:hidden mix-blend-difference w-fit aspect-square p-2"
    aria-label="Toggle mobile menu"
  >
    <div class="w-8 h-8 flex flex-col justify-center space-y-1.5">
      <span
        class="block h-1 w-8 bg-current transform transition-transform duration-300"
        :class="isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''"
      ></span>
      <span
        class="block h-1 w-8 bg-current transition-opacity duration-300"
        :class="isMobileMenuOpen ? 'opacity-0' : ''"
      ></span>
      <span
        class="block h-1 w-8 bg-current transform transition-transform duration-300"
        :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''"
      ></span>
    </div>
  </button>
</template>
