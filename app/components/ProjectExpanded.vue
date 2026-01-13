<template>
  <div
    class="project-expanded"
    data-fade-opacity
  >
    <div class="project-card">
      <div
        class="flex w-fit pt-2 pb-2 btn gap-2 items-center"
        @click="$emit('close')"
      >
        <button class="h-fit">
          <span class="mix-blend-difference btn cursor-none">
            <Icon icon="material-symbols:arrow-back" />
          </span>
        </button>
        <span class="mix-blend-difference text-sm">Return to Projects</span>
      </div>
      <h1 class="text-4xl sm:text-6xl title-wrapper flex gap-4">
        {{ project.title }}
      </h1>
      <div class="flex flex-col 2xl:flex-row gap-4 2xl:gap-8">
        <div class="project-image-gallery 2xl:max-w-[1000px] 2xl:w-[50%]">
          <NuxtImg
            class="project-image w-full h-auto object-contain cursor-zoom-in native-cursor"
            :src="activeImage?.src"
            :alt="activeImage?.alt"
            format="webp"
            sizes="100vw lg:1000px"
            @click="showInspector = true"
          />
          <div
            v-if="project.images.length > 1"
            class="image-thumbnails overflow-x-scroll "
          >
            <NuxtImg
              v-for="(img, idx) in project.images"
              :key="img.src"
              :src="img.src"
              :alt="img.alt"
              :class="['thumbnail btn native-cursor cursor-pointer', { active: idx === selectedImage }]"
              format="webp"
              sizes="150px"
              loading="lazy"
              @click="selectedImage = typeof idx === 'number' ? idx : 0"
            />
          </div>
        </div>

        <div class="hidden 2xl:flex 2xl:bg-[var(--white)] 2xl:w-[1px] 2xl:opacity-20 2xl:mix-blend-difference" />

        <div class="project-details">
          <div class="flex gap-8 flex-1">
            <div class="flex flex-col flex-1 gap-4">
              <div class="flex-1 flex flex-col gap-2">
                <div class="flex gap-4 w-full justify-between items-center">
                  <div class="skill-card">
                    <img
                      v-for="skill in props.project.skills"
                      :key="skill.alt"
                      :src="skill.icon"
                      :alt="skill.alt"
                    >
                  </div>
                  <div class="flex gap-4">
                    <a
                      v-if="props.project.liveUrl"
                      :href="props.project.liveUrl"
                      class="btn cursor-none hover-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        icon="uil:browser"
                        height="none"
                        :style="{ width: '24px', height: '24px' }"
                      /><span>View
                        Live</span>
                    </a>
                    <a
                      v-if="props.project.repoUrl"
                      :href="props.project.repoUrl"
                      class="btn cursor-none hover-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        icon="uil:github"
                        height="none"
                        :style="{ width: '24px', height: '24px' }"
                      /><span>Github</span>
                    </a>
                  </div>
                </div>
                <span
                  v-if="props.project.type"
                  class="text-sm mix-blend-difference font-mono uppercase"
                >
                  {{ props.project.type }}
                </span>
                <p>
                  {{ project.descriptionLong }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showInspector"
        class="fixed  inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-none"
        @click="showInspector = false"
      >
        <button
          class="btn cursor-none absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[101]"
          @click.stop="showInspector = false"
        >
          <Icon
            icon="material-symbols:close"
            width="32"
            height="32"
          />
        </button>
        <NuxtImg
          v-if="activeImage"
          :src="activeImage.src"
          :alt="activeImage.alt"
          class="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain select-none native-cursor cursor-default"
          format="webp"
          sizes="100vw"
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type Project = typeof projects[number]

const props = defineProps<{ project: Project }>()
const selectedImage = ref(0)
const showInspector = ref(false)

const activeImage = computed(() => {
  return props.project.images[selectedImage.value]
})

defineEmits(['close'])
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
