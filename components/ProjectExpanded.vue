<template>
  <div class="project-expanded">
    <!-- <h1 class="text-2xl">{{ project.title }}</h1>
    <img class="h-48" :src="project.imageSrc" :alt="project.imageAlt" />
    <p>{{ project.description }}</p> -->
    <div class="color-[var(--white)] mix-blend-difference">
      test
    </div>
    <!-- Add more details as needed -->
    <!-- <button class="mix-blend-difference bg-[var(--white)] p-2" @click="$emit('close')"><span class="mix-blend-difference color-[var(--white)]">Close</span></button> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ project: any }>();
</script>

<style scoped>
.project-expanded div {
  height: -webkit-fill-available;
}
</style>
