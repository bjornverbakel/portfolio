<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface ProjectImage {
  src: string;
  alt: string;
}
interface Props {
  title: string;
  descriptionShort: string;
  images: ProjectImage[];
  skills: Array<{
    icon: string;
    alt: string;
  }>;
  liveUrl?: string;
}

const emit = defineEmits(['select'])
defineProps<Props>()
</script>

<template>
  <div
    class="project-card btn"
    @click="emit('select')"
  >
    <NuxtImg
      v-if="images && images.length"
      :src="images[0]?.src"
      :alt="images[0]?.alt"
      format="webp"
      sizes="300px"
      class="project-image cursor-pointer native-cursor w-[20vw] min-w-[225px] lg:min-w-[210px] max-w-[225px] aspect-video object-cover bg-gray-200"
    />

    <div class="project-details">
      <div class="flex gap-4 flex-1">
        <div class="hidden md:flex bg-[var(--white)] w-[1px] mix-blend-difference" />
        <div class="flex flex-col flex-1 gap-4">
          <h1 class="text-xl title-wrapper">
            <span>{{ title }}</span>
          </h1>
          <div class="flex-1 flex flex-col justify-between gap-4">
            <p class="text-sm">
              {{ descriptionShort }}
            </p>
            <div class="flex gap-4 justify-between">
              <div class="skill-card">
                <img
                  v-for="skill in skills"
                  :key="skill.alt"
                  :src="skill.icon"
                  :alt="skill.alt"
                >
              </div>
              <a
                v-if="liveUrl"
                :href="liveUrl"
                class="btn hover-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="uil:browser"
                  height="none"
                  :style="{ width: '24px', height: '24px' }"
                />
                <span>Live</span>
              </a>
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
    mix-blend-mode: difference;
    word-wrap: break-word;
    hyphens: auto;
    text-align: left;

    span {
      mix-blend-mode: difference;
    }
  }
}

.hover-btn {
  padding: 0.25rem 0.5rem;
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
