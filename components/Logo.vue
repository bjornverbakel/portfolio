<script setup>
import { ref } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";
const logoRef = ref(null);
const emit = defineEmits(["height"]);

useEmitHeight(logoRef, emit, "height");
</script>

<template>
  <div id="logo" class="flex m-8 z-10" ref="logoRef">
    <img draggable="false" src="/logo.svg" alt="Logo" />
  </div>
</template>