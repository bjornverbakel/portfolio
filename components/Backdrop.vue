<script setup>
defineProps({
  headerHeight: Number,
  contentHeight: Number,
  state: String
})
</script>

<template>
  <div
    class="backdrop"
    :style="state === 'header'
      ? { top: headerHeight + 'px', bottom: '0px' }
      : { top: '0px', bottom: contentHeight + 'px' }"
  ></div>
</template>