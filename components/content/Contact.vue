<script setup lang="ts">
import { NuxtImg } from "#components";
</script>

<template>
  <article class="w-full flex flex-col gap-16 text-justify">
    <section class="flex flex-col gap-4">
      <h1 class="text-xl" data-fade-color>Contact</h1>
      <p data-fade-color>You can contact me at...</p>
      <div>
        
      </div>
    </section>
    <section class="flex flex-col gap-4">
      <h2 class="text-lg" data-fade-color>You can also find me on:</h2>
      <div class="flex gap-4" data-fade-opacity>
        <a
          href="https://www.linkedin.com/in/bjorn-verbakel-651938349/"
          class="social-btn btn"
          ><NuxtImg src="/images/linkedin.svg" alt="LinkedIn" /><span
            >LinkedIn</span
          ></a
        >
        <a href="https://github.com/bjornverbakel" class="social-btn btn"
          ><NuxtImg src="/images/github.svg" alt="Github" /><span
            >Github</span
          ></a
        >
      </div>
    </section>
  </article>
</template>

<style scoped>
.social-btn {
  display: flex;
  align-items: center;
  mix-blend-mode: difference;
  padding: 0.5rem 0.75rem;
  gap: 8px;
  position: relative;

  span {
    color: var(--white);
    mix-blend-mode: difference;
  }

  img {
    width: 2rem;
    height: 2rem;
    -webkit-user-drag: none;
    mix-blend-mode: difference;
  }
}

.social-btn::before,
.social-btn::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--white);
  transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.social-btn::before {
  width: 100%;
  height: 100%;
}
.social-btn::after {
  width: 0;
  height: 4px;
}

.social-btn:hover::before {
  width: 0;
}
.social-btn:hover::after {
  width: 100%;
}

.social-btn.active::before {
  width: 0;
}
.social-btn.active::after {
  width: 100%;
}
</style>
