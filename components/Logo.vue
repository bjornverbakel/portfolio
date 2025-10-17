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
  <div id="logo" class="flex m-8 mr-[116px] sm:mr-8 z-10" ref="logoRef">
    <NuxtImg 
      draggable="false" 
      src="/images/logo.svg" 
      alt="Logo" 
      :class="{ 
        'logo-small': logoShouldBeSmall, 
        'logo-big': !logoShouldBeSmall 
      }"
      class="logo-transition btn"
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

.logo-transition {
  transition: all 0.5s ease;
}

/* Small mode (when backdrop is 'content') */
.logo-small {
  height: 50px;
}

/* Big mode (when backdrop is not 'content') */
.logo-big {
  height: 80px;
}

/* Breakpoints for small mode */
@media (min-width: 1024px) {
  .logo-small {
    height: 75px;
  }
}

/* Breakpoints for big mode */
@media (min-width: 375px) {
  .logo-big {
    height: 100px;
  }
}

@media (min-width: 425px) {
  .logo-big {
    height: 110px;
  }
}

@media (min-width: 480px) {
  .logo-big {
    height: 140px;
  }
}

@media (min-width: 540px) {
  .logo-big {
    height: 150px;
  }
}

@media (min-width: 640px) {
  .logo-big {
    height: 180px;
  }
}

@media (min-width: 768px) {
  .logo-big {
    height: 210px;
  }
}

@media (min-width: 1024px) {
  .logo-big {
    height: 250px;
  }
}

@media (min-width: 1280px) {
  .logo-big {
    height: 280px;
  }
}

@media (min-width: 1536px) {
  .logo-big {
    height: 300px;
  }
}
</style>