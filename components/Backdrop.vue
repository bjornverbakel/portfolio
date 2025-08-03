<script setup>
defineProps({
  headerHeight: Number,
  contentHeight: Number,
  state: String,
});
</script>

<template>
  <div
    class="backdrop"
    :style="
      state === 'header'
        ? { top: headerHeight + 'px', bottom: '0px' }
        : { top: '0px', bottom: contentHeight + 'px' }
    "
  ></div>
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
