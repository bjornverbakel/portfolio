<template>
  <article class="w-full flex flex-col gap-16 text-justify">
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

      <!-- Frontend Development -->
      <div class="skill-category">
        <h2 class="text-sm mb-2 opacity-80 text-gray-600">Development</h2>
        <ul>
          <li class="skill-card">
            <NuxtImg src="/images/skills/js.svg" alt="JavaScript" />
            <span>JavaScript</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/vue.svg" alt="Vue.js" />
            <span>Vue.js</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/nuxt.svg" alt="Nuxt" />
            <span>Nuxt</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/react.svg" alt="React" />
            <span>React (R3F)</span>
          </li>
        </ul>
      </div>

      <!-- 3D & Graphics -->
      <div class="skill-category">
        <h2 class="text-sm mb-2 opacity-80 text-gray-600">3D & Graphics</h2>
        <ul>
          <li class="skill-card">
            <NuxtImg src="/images/skills/threejs.svg" alt="Three.js" />
            <span>Three.js</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/blender.svg" alt="Blender" />
            <span>Blender</span>
          </li>
        </ul>
      </div>

      <!-- Design Tools -->
      <div class="skill-category">
        <h2 class="text-sm mb-2 opacity-80 text-gray-600">Design & Media</h2>
        <ul>
          <li class="skill-card">
            <NuxtImg src="/images/skills/figma.svg" alt="Figma" />
            <span>Figma</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/premiere.svg" alt="Premiere Pro" />
            <span>Premiere Pro</span>
          </li>
          <li class="skill-card">
            <NuxtImg src="/images/skills/photoshop.svg" alt="Photoshop" />
            <span>Photoshop</span>
          </li>
        </ul>
      </div>
    </section>
    <!-- <img
      src="@/public/images/portrait-dither.png"
      alt="Portrait of Bjorn"
      class="w-1/5 h-fit object-cover rounded-full border-2 border-solid border-[var(--black)]"
    /> -->
  </article>
</template>
