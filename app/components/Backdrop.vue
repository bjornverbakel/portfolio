<script setup>
defineProps({
  headerHeight: {
    type: Number,
    default: 0,
  },
  contentHeight: {
    type: Number,
    default: 0,
  },
  state: {
    type: String,
    default: '',
  },
  // Accept but don't use; prevents fallthrough attrs on root element
  isScrolling: Boolean,
})
</script>

<template>
  <div
    class="backdrop"
    :style="
      state === 'header'
        ? { top: headerHeight + 'px', bottom: '0px' }
        : { top: '0px', bottom: contentHeight + 'px' }
    "
  />
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--black);
  transition:
    top 0.5s ease,
    bottom 0.5s ease;
}

.backdrop.no-transition {
  transition: none;
}
</style>
