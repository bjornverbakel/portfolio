<template>
  <article class="flex flex-col gap-16 text-justify">
    <section class="flex flex-col gap-4">
      <h1 class="text-xl">About Me</h1>
      <p>
        My name is Bjorn Verbakel. I am an HBO-ICT student at Fontys University
        of Applied Sciences in Eindhoven, with a focus on front-end development.
      </p>
      <p>
        In addition to web development, I'm also interested in 3D modeling. I
        like exploring how 3D elements can be used in websites or applications
        to create more engaging and interactive experiences.
      </p>
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-xl">Skills</h1>
      <ul class="flex flex-row flex-wrap gap-2">
        <li class="skill-card">
          <NuxtImg src="/icons/skills/js.svg" alt="JavaScript" />
          <span>JavaScript</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/vue.svg" alt="Vue.js" />
          <span>Vue.js</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/nuxt.svg" alt="Nuxt" />
          <span>Nuxt</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/react.svg" alt="React" />
          <span>React (R3F)</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/threejs.svg" alt="Three.js" />
          <span>Three.js</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/figma.svg" alt="Figma" />
          <span>Figma</span>
        </li>
        <li class="skill-card">
          <NuxtImg src="/icons/skills/blender.svg" alt="Blender" />
          <span>Blender</span>
        </li>
      </ul>
    </section>
    <!-- <img
      src="@/public/images/portrait-dither.png"
      alt="Portrait of Bjorn"
      class="w-1/5 h-fit object-cover rounded-full border-2 border-solid border-[var(--black)]"
    /> -->
  </article>
</template>

<style></style>
