<script setup lang="ts">
import { NuxtImg } from "#components";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  skills: Array<{
    icon: string;
    alt: string;
  }>;
}

const emit = defineEmits(["select"]);
defineProps<Props>();
</script>

<template>
  <div class="project-card btn" @click="emit('select')">
    <NuxtImg
      :src="imageSrc"
      :alt="imageAlt"
      class="project-image w-[20vw] min-w-[225px] lg:min-w-[200px] max-w-[225px]"
    />

    <div class="project-details">
      <div class="flex gap-4 flex-1">
        <div class="bg-[var(--white)] w-1 mix-blend-difference"></div>
        <div class="flex flex-col flex-1 gap-2">
          <h1 class="text-xl title-wrapper">
            <span>{{ title }}</span>
          </h1>
          <div class="flex-1 flex flex-col justify-between gap-2">
            <p class="text-sm">
              {{ description }}
            </p>
            <div class="flex gap-2 justify-between">
              <div class="skill-card">
                <NuxtImg
                  v-for="skill in skills"
                  :key="skill.alt"
                  :src="skill.icon"
                  :alt="skill.alt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: row;
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

  div h1.title-wrapper {
    background: var(--white);
    padding: 0.25rem 0.75rem;
    mix-blend-mode: difference;
    word-wrap: break-word;
    hyphens: auto;

    span {
      mix-blend-mode: difference;
    }
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
