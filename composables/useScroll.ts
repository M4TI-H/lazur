export function useScroll() {
  const scrollY = ref<number>(0);

  const updateScroll = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateScroll);
  });

  return { scrollY };
}
