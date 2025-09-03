<template>
  <div class="project-expanded" data-fade-opacity>
    <div class="project-card">
      <h1 class="text-6xl title-wrapper flex items-center gap-4">
        <button class="btn mix-blend-difference bg-[var(--white)]" @click="$emit('close')">
          <span class="mix-blend-difference">
            <Icon icon="mdi:close" height="none" :style="{ width: '56px', height: '56px' }" />
          </span>
        </button>
        {{ project.title }}
      </h1>

      <img class="project-image" :src="project.imageSrc" :alt="project.imageAlt" />

      <div class="project-details">
        <div class="flex gap-4 flex-1">
          <div class="bg-[var(--white)] w-1 mix-blend-difference"></div>
          <div class="flex flex-col flex-1 gap-2">

            <div class="flex-1 flex flex-col justify-between gap-2">
              <p>
                {{ project.descriptionLong }}
              </p>
              <div class="flex gap-2 justify-between">
                <div class="skill-card">
                  <NuxtImg v-for="skill in project.skills" :key="skill.alt" :src="skill.icon" :alt="skill.alt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{ project: any }>();
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 1rem;
  gap: 1rem;
  position: relative;
  align-items: stretch;
}

.project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
  mix-blend-mode: difference;
  z-index: 1;
  pointer-events: none;
}

.project-image {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  height: auto;
  object-fit: cover;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  .skill-card {
    display: flex;
    padding: 0;
    position: relative;
    z-index: 0;
    mix-blend-mode: normal;
    background: none;
  }
}

h1.title-wrapper {
  mix-blend-mode: difference;
  word-wrap: break-word;
  hyphens: auto;
  text-align: left;

  span {
    mix-blend-mode: difference;
    width: 20px;
  }
}

/* Responsive design for mobile */
@media (max-width: 768px) {
  .project-card {
    flex-direction: column;
  }

  .project-image {
    width: 100%;
    max-width: none;
  }
}
</style>
