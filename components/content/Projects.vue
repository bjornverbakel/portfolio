<script setup lang="ts">
import { NuxtImg } from "#components";
</script>

<template>
  <article class="w-full flex flex-col gap-16 text-justify">
    <section class="flex flex-col gap-4">
      <h1 class="text-xl">Projects</h1>
      <p>These are some of the projects I've worked on...</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="project-card">
          <NuxtImg
            src="/images/projects/unbubble.png"
            alt="Advertising screen mockup"
            class="project-image"
          />

          <div class="project-details">
            <div class="flex gap-1">
              <div class="bg-[var(--white)] w-1 mix-blend-difference"></div>
              <div class="flex flex-col">
                <h1 class="text-xl"><span>Unbubble</span></h1>
                <p class="p-1 pl-3 pr-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <div class="flex gap-2 justify-between p-1 pl-3 pr-3">
                  <div class="skill-card">
                    <NuxtImg src="/images/skill-icons/react.svg" alt="React" />
                    <NuxtImg
                      src="/images/skill-icons/tailwind.svg"
                      alt="Tailwind"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 1rem;
  gap: 0.5rem;
  position: relative;
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
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .skill-card {
    display: flex;
    padding: 0;
    position: relative;
    z-index: 0;
    mix-blend-mode: normal;
    background: none;
  }

  div h1 {
    background: var(--white);

    span {
      mix-blend-mode: difference;
      padding: 0.25rem 0.75rem;
    }
  }
}
</style>
