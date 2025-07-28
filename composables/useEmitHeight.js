import { onMounted, onBeforeUnmount } from "vue";

export function useEmitHeight(refEl, emit, eventName = "height") {
  function updateHeight() {
    if (refEl.value) {
      const el = refEl.value;
      const style = window.getComputedStyle(el);
      const marginTop = parseInt(style.marginTop, 10);
      const marginBottom = parseInt(style.marginBottom, 10);
      emit(eventName, el.offsetHeight + marginTop + marginBottom);
      console.log(`Emitted ${eventName}:`, el.offsetHeight + marginTop + marginBottom);
    }
  }

  onMounted(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateHeight);
  });

  return { updateHeight };
}