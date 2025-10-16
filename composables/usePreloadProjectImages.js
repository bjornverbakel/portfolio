import { projects } from '~/data/projects.ts';

export function usePreloadProjectImages() {
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadAllImages = async () => {
    // Get the first image from each project
    const imagesToPreload = projects
      .filter(project => project.images && project.images.length > 0)
      .map(project => project.images[0].src);

    try {
      await Promise.all(imagesToPreload.map(preloadImage));
      console.log('All project images preloaded');
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  };

  // Start preloading immediately
  if (process.client) {
    preloadAllImages();
  }
}