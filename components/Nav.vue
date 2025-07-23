<script setup>
import { ref } from "vue";
import { useEmitHeight } from "../composables/useEmitHeight";
const navRef = ref(null);
const emit = defineEmits(["height", "navClick"]);

const { updateHeight } = useEmitHeight(navRef, emit, "height");

function handleNavClick(section) {
  updateHeight();
  emit("navClick", section);
}
</script>

<template>
  <nav class="m-8 flex flex-col flex-grow text-6xl" ref="navRef">
    <ul class="flex flex-col flex-grow gap-8">
      <li class="nav-btn btn" @click="handleNavClick('About')">About</li>
      <li class="nav-btn btn" @click="handleNavClick('Projects')">Projects</li>
      <li class="nav-btn btn" @click="handleNavClick('Contact')">Contact</li>
    </ul>
  </nav>
</template>
