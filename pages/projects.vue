<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projects } from '~/data/projects';
import ProjectExpanded from '~/components/ProjectExpanded.vue';

const baseCardDelay = 600; // delay cards from appearing after going from home to projects

const router = useRouter();
const fromHome = ref(false);

onMounted(() => {
  // Check if we came from the home page
  const previousRoute = router.options.history.state.back;
  fromHome.value = previousRoute === '/' || previousRoute === '/index';
});

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
  fadeState.value = 'fading';
  selectedProject.value = null;
  setTimeout(() => {
    fadeState.value = 'cards';
  }, 400); // match with fade-out duration
}

// Calculate delay for each card
function getCardDelay(index: number) {
  const base = fromHome.value ? baseCardDelay : 1; // card bugs out and shifts in from the side if using 0 ms for some reason ¯\_(ツ)_/¯
  return `${base + index * 90}ms`;
}
</script>

<template>
    <NuxtLayout>
        <article class="w-full flex flex-col gap-16 text-justify max-w-[1500px]">
            <section class="flex flex-col gap-4">
                <div v-if="fadeState !== 'detail'" class="flex flex-col gap-4">
                    <h1 class="text-6xl" data-fade-opacity :class="{ 'fade-out': fadeState === 'fading' }">Projects</h1>
                    <p data-fade-opacity :class="{ 'fade-out': fadeState === 'fading' }">These are some of the projects
                        I've worked on:</p>
                </div>
                <transition-group v-if="fadeState !== 'detail'" name="fade-opacity" tag="div"
                    class="grid grid-cols-1 2xl:grid-cols-2 gap-8 items-stretch">
                    <ProjectCard v-for="(project, i) in projects" v-show="fadeState === 'cards'" :key="project.title"
                        data-fade-opacity
                        :style="{ transitionDelay: fadeState === 'fading' ? '0ms' : getCardDelay(i) }"
                        :title="project.title" :descriptionShort="project.descriptionShort" :images="project.images"
                        :skills="project.skills" :live-url="project.liveUrl" class="h-full"
                        @select="() => handleSelect(project)" />
                </transition-group>
                <transition name="fade-opacity">
                    <ProjectExpanded v-if="fadeState === 'detail' && selectedProject" :project="selectedProject"
                        @close="handleCloseDetail" />
                </transition>
            </section>
        </article>
    </NuxtLayout>
</template>