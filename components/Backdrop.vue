<script setup>
defineProps({
  logoHeight: Number,
  navHeight: Number,
  state: String
})
</script>

<template>
  <div
    class="backdrop"
    :style="state === 'logo'
      ? { top: logoHeight + 'px', bottom: '0px' }
      : { top: '0px', bottom: navHeight + 'px' }"
  ></div>
</template>