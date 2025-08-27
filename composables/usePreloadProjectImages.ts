import { ref, onMounted } from 'vue';
import { projects } from '~/data/projects';

export function usePreloadProjectImages() {
  const loaded = ref(false);

  onMounted(() => {
    // Preload all project images in parallel
    const promises = projects.map(p => new Promise<void>((resolve) => {
      const img = new Image();
      img.src = p.imageSrc;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // ignore errors, still resolve
      }
    }));

    Promise.all(promises).then(() => {
      loaded.value = true;
    });
  });

  return { loaded };
}
