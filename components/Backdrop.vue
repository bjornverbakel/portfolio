<script setup>
defineProps({
  headerHeight: Number,
  contentHeight: Number,
  state: String,
  isScrolling: Boolean
})
</script>

<template>
  <div
    class="backdrop"
    :class="{ 'no-transition': isScrolling }"
    :style="state === 'header'
      ? { top: headerHeight + 'px', bottom: '0px' }
      : { top: '0px', bottom: contentHeight + 'px' }"
  ></div>
</template>