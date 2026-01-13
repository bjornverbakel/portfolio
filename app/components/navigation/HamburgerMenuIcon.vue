<script setup>
defineProps({
  isMobileMenuOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle'])

function toggleMobileMenu() {
  emit('toggle')
}
</script>

<template>
  <button
    class="btn fixed z-50 top-[42px] right-[42px] sm:top-8 sm:left-8 sm:right-auto lg:hidden mix-blend-difference w-fit aspect-square"
    aria-label="Toggle mobile menu"
    @click="toggleMobileMenu"
  >
    <div class="w-8 h-8 flex flex-col justify-center space-y-1.5">
      <span
        class="block h-1 w-8 bg-current transform transition-transform duration-300"
        :class="isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''"
      />
      <span
        class="block h-1 w-8 bg-current transition-opacity duration-300"
        :class="isMobileMenuOpen ? 'opacity-0' : ''"
      />
      <span
        class="block h-1 w-8 bg-current transform transition-transform duration-300"
        :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''"
      />
    </div>
  </button>
</template>
