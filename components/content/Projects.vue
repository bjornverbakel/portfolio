<script setup lang="ts">
import { ref } from 'vue';
import { projects } from '~/data/projects';
import ProjectExpanded from '~/components/ProjectExpanded.vue';

const baseCardDelay = 600; // delay cards from appearing after going from home to projects

const props = defineProps<{ fromHeader?: boolean }>();

const selectedProject = ref(null);
const fadeState = ref('cards'); // 'cards' | 'fading' | 'detail'

function handleSelect(project: any) {
  fadeState.value = 'fading';
  setTimeout(() => {
    selectedProject.value = project;
    fadeState.value = 'detail';
  }, 400); // match with fade-out duration
}

function handleCloseDetail() {
  fadeState.value = 'cards';
  selectedProject.value = null;
}
</script>

<template>
  <article class="w-full flex flex-col gap-16 text-justify">
    <section class="flex flex-col gap-4">
      <div v-if="fadeState !== 'detail'" class="flex flex-col gap-4">
        <h1 class="text-xl" data-fade-opacity :class="{ 'fade-out': fadeState === 'fading' }">Projects</h1>
        <p data-fade-opacity :class="{ 'fade-out': fadeState === 'fading' }">These are some of the projects I've worked on:</p>
      </div>
      <transition-group v-if="fadeState !== 'detail'" name="fade-opacity" tag="div" class="grid grid-cols-1 2xl:grid-cols-2 gap-8 items-stretch">
        <ProjectCard v-for="(project, i) in projects" v-show="fadeState === 'cards'" :key="project.title"
          data-fade-opacity
          :style="fadeState === 'cards' ? { transitionDelay: ((props.fromHeader ? baseCardDelay : 0) + i * 90) + 'ms' } : { transitionDelay: '0ms' }"
          :title="project.title" :description="project.description" :image-src="project.imageSrc"
          :image-alt="project.imageAlt" :skills="project.skills" class="h-full" @select="() => handleSelect(project)" />
      </transition-group>
      <transition name="fade-opacity">
        <ProjectExpanded v-if="fadeState === 'detail' && selectedProject" :project="selectedProject"
          @close="handleCloseDetail" />
      </transition>
    </section>
  </article>
</template>
