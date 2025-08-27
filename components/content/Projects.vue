<script setup lang="ts">
import { projects } from '~/data/projects';

const baseCardDelay = 600; // delay cards from appearing after going from home to projects

const props = defineProps<{ fromHeader?: boolean }>();
</script>

<template>
  <article class="w-full flex flex-col gap-16 text-justify">
    <section class="flex flex-col gap-4">
      <h1 class="text-xl" data-fade-color>Projects</h1>
      <p data-fade-color>These are some of the projects I've worked on:</p>
      <div class="card-container grid grid-cols-1 2xl:grid-cols-2 gap-8 items-stretch">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.title"
          data-fade-opacity
          :style="{ transitionDelay: ((props.fromHeader ? baseCardDelay : 0) + i * 90) + 'ms' }"
          :title="project.title"
          :description="project.description"
          :image-src="project.imageSrc"
          :image-alt="project.imageAlt"
          :skills="project.skills"
          class="h-full"
        />
      </div>
    </section>
  </article>
</template>

<style scoped>

</style>
