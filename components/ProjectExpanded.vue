<template>
  <div class="project-expanded" data-fade-opacity>
    <div class="project-card">
      <div class="flex btn gap-2 items-center" @click="$emit('close')">
        <button class="h-fit">
          <span class="mix-blend-difference btn cursor-none">
            <Icon icon="material-symbols:arrow-back" height="24" />
          </span>
        </button>
        <span class="mix-blend-difference text-xl">Return to Projects</span>
      </div>
      <h1 class="text-4xl sm:text-6xl title-wrapper flex gap-4">
        {{ project.title }}
      </h1>
      <div class="flex flex-col 2xl:flex-row gap-4 2xl:gap-8">
        <div class="project-image-gallery 2xl:max-w-[1000px] 2xl:w-[50%]">
          <img class="project-image w-full object-contain" :src="project.images[selectedImage].src"
            :alt="project.images[selectedImage].alt" />
          <div v-if="project.images.length > 1" class="image-thumbnails overflow-x-scroll ">
            <img v-for="(img, idx) in project.images" :key="img.src" :src="img.src" :alt="img.alt"
              :class="['thumbnail btn', { active: idx === selectedImage }]" @click="selectedImage = idx" />
          </div>
        </div>

        <div class="hidden 2xl:flex 2xl:bg-[var(--white)] 2xl:w-[1px] 2xl:opacity-20 2xl:mix-blend-difference"></div>

        <div class="project-details">
          <div class="flex gap-8 flex-1">
            <div class="flex flex-col flex-1 gap-4">
              <div class="flex-1 flex flex-col gap-2">
                <div class="flex gap-4 w-full justify-between items-center">
                  <div class="skill-card">
                    <NuxtImg v-for="skill in project.skills" :key="skill.alt" :src="skill.icon" :alt="skill.alt" />
                  </div>
                  <a v-if="project.liveUrl" :href="project.liveUrl" class="btn cursor-none hover-btn" target="_blank"
                    rel="noopener noreferrer">
                    <Icon icon="uil:browser" height="none" :style="{ width: '24px', height: '24px' }" /><span>View
                      Live</span>
                  </a>
                </div>
                <p>
                  {{ project.descriptionLong }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ project: any }>()
const selectedImage = ref(0)
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--white);
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
  z-index: 1;
  pointer-events: none;


}

.project-image {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  height: auto;
}

.project-image-gallery {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
  /* Hide scrollbar for WebKit browsers (Chrome, Safari, Edge) */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
}

.image-thumbnails::-webkit-scrollbar {
  display: none; /* WebKit browsers */
}

.thumbnail {
  width: 8rem;
  height: 6rem;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border 0.2s;
}

.thumbnail.active,
.thumbnail:hover {
  border: 2px solid var(--white);
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.skill-card {
  display: flex;
  padding: 0;
  position: relative;
  z-index: 0;
  mix-blend-mode: normal;
  background: none;
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

  .skill-card {
    width: fit-content;
  }
}
</style>
