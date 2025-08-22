<script setup>
import { ref, computed, watch } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";

const props = defineProps({
  backdropState: String
});

const logoRef = ref(null);
const emit = defineEmits(["height", "logoClick"]);

// Use the height emitter composable
const { updateHeight } = useEmitHeight(logoRef, emit, "height");

// Simplified: logo small only when backdropState === 'content' (same for mobile & desktop)
const logoShouldBeSmall = computed(() => props.backdropState === 'content');

// Update height when state changes
watch(logoShouldBeSmall, () => {
  setTimeout(updateHeight, 50);
});

// Handle logo click: scroll to top & emit logoClick for parent to reset backdropState
function handleLogoClick() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  emit("logoClick");
}
</script>

<template>
  <div id="logo" class="flex m-8 z-10" ref="logoRef">
    <img 
      draggable="false" 
      src="/icons/logo.svg" 
      alt="Logo" 
      :class="{ 
        'h-[50px] lg:h-[75px]': logoShouldBeSmall, 
        'h-[300px]': !logoShouldBeSmall 
      }"
      class="transition-all duration-500 ease btn"
      @click="handleLogoClick"
    />
  </div>
</template>

<style scoped>
#logo {
  -webkit-user-select: none;
  user-select: none;
  width: -webkit-fill-available;
  max-height: 300px;
}
</style>