<script setup>
const props = defineProps({
  activeSection: String
});

const emit = defineEmits(["navClick"]);

function handleNavClick(section) {
  emit("navClick", section);
}
</script>

<template>
  <nav class="m-8 flex flex-col flex-grow text-6xl fixed mix-blend-difference">
    <ul class="flex flex-col flex-grow gap-8">
      <li class="nav-btn btn" @click="handleNavClick('About')">About</li>
      <li class="nav-btn btn" @click="handleNavClick('Projects')">Projects</li>
      <li class="nav-btn btn" @click="handleNavClick('Contact')">Contact</li>
    </ul>
  </nav>
</template>
