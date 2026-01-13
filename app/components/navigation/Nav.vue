<script setup>
defineProps({
  activeSection: {
    type: String,
    default: null,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navClick'])

function handleNavClick(section, event) {
  event.preventDefault() // Prevent default link behavior
  emit('navClick', section)
}
</script>

<template>
  <nav
    class="flex mix-blend-difference"
    :class="[horizontal ? 'flex-row hidden lg:flex mr-8' : 'flex-col flex-grow m-8']"
  >
    <ul
      class="flex gap-8"
      :class="horizontal ? 'flex-row' : 'flex-col flex-grow'"
    >
      <li
        class="nav-btn btn"
        :class="{ active: activeSection === 'about' }"
        @click="handleNavClick('about', $event)"
      >
        <NuxtLink to="/about" class="nav-link">
          <span>About</span>
        </NuxtLink>
      </li>
      <li
        class="nav-btn btn"
        :class="{ active: activeSection === 'projects' }"
        @click="handleNavClick('projects', $event)"
      >
        <NuxtLink to="/projects" class="nav-link">
          <span>Projects</span>
        </NuxtLink>
      </li>
      <li
        class="nav-btn btn"
        :class="{ active: activeSection === 'contact' }"
        @click="handleNavClick('contact', $event)"
      >
        <NuxtLink to="/contact" class="nav-link">
          <span>Contact</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1.75rem;
  line-height: 1;
}

nav.flex-row {
  font-size: 1.75rem;
}

#mobile-menu nav {
  margin-top: calc(64px + 4px + 4rem);
}

.nav-btn {
  user-select: none;
  mix-blend-mode: difference;
  line-height: normal;
  width: min-content;
  font-family: "Mono Regular", sans-serif;
  padding: 0;
  position: relative;
}

.nav-link {
  display: block;
  padding: 0 .75rem;
  text-decoration: none;
  color: inherit;
}

.nav-btn span {
  mix-blend-mode: difference;
}

.nav-btn::before,
.nav-btn::after {
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  bottom: 0;
  background-color: var(--white);
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-btn::before {
  height: 100%;
}

.nav-btn::after {
  height: 2px;
}

.nav-btn:hover::after {
  width: 100%;
}

.nav-btn.active::before {
  width: 100%;
}
</style>
