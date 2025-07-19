<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const navRef = ref(null);
const emit = defineEmits(["height", "navClick"]);

function updateHeight() {
  if (navRef.value) {
    const el = navRef.value;
    const style = window.getComputedStyle(el);
    const marginTop = parseInt(style.marginTop, 10);
    const marginBottom = parseInt(style.marginBottom, 10);
    emit("height", el.offsetHeight + marginTop + marginBottom);
  }
}

function handleNavClick() {
  updateHeight();
  emit("navClick");
}

onMounted(() => {
  updateHeight();
  window.addEventListener("resize", updateHeight);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeight);
});
</script>

<template>
  <nav class="m-8 flex flex-col flex-grow" ref="navRef">
    <ul class="flex flex-col flex-grow gap-8">
      <li><p class="nav-btn" @click="handleNavClick">About</p></li>
      <li><p class="nav-btn" @click="handleNavClick">Projects</p></li>
      <li><p class="nav-btn" @click="handleNavClick">Contact</p></li>
    </ul>
  </nav>
</template>
