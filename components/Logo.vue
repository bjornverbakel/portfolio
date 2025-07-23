<script setup>
import { ref } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";
const logoRef = ref(null);
const emit = defineEmits(["height"]);

useEmitHeight(logoRef, emit, "height");
</script>

<template>
  <div id="logo" class="flex mix-blend-difference m-8 select-none" ref="logoRef">
    <img draggable="false" src="/logo.svg" alt="Logo" />
  </div>
</template>