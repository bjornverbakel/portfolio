<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  headerHeight: Number,
  contentHeight: Number,
  state: String,
  isScrolling: Boolean,
});


const slideIn = ref(false);
onMounted(() => {
  setTimeout(() => { slideIn.value = true; }, 1200);
});
</script>

<template>
  <div
    class="backdrop"
    :class="{ 'slide-in': slideIn }"
    :style="
      props.state === 'header'
        ? { top: props.headerHeight + 'px', bottom: '0px' }
        : { top: '0px', bottom: props.contentHeight + 'px' }
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

.backdrop {
  transform: translateY(100vh);
  transition:
    top 0.5s ease,
    bottom 0.5s ease,
    transform 0.8s cubic-bezier(0.77,0,0.175,1);
}
.backdrop.slide-in {
  transform: translateY(0);
}

.backdrop.no-transition {
  transition: none;
}
</style>
