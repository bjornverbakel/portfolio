<script setup>
const props = defineProps({
  activeSection: String,
  horizontal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["navClick"]);

function handleNavClick(section) {
  emit("navClick", section);
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
        @click="handleNavClick('About')"
      >
        <span>About</span>
      </li>
      <li
        class="nav-btn btn"
        :class="{ active: activeSection === 'projects' }"
        @click="handleNavClick('Projects')"
      >
        <span>Projects</span>
      </li>
      <li
        class="nav-btn btn"
        :class="{ active: activeSection === 'contact' }"
        @click="handleNavClick('Contact')"
      >
        <span>Contact</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  font-size: clamp(2.75rem, 3.5vw, 3.75rem);
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
  padding: 0 1rem;
  position: relative;
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
  height: 4px;
}

.nav-btn:hover::after {
  width: 100%;
}

.nav-btn.active::before {
  width: 100%;
}
</style>
