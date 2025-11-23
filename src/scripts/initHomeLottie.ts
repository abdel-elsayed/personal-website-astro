import lottie from "lottie-web";
import homeAnimation from "../assets/HomePageAnimation.json";

// Run after first paint so the container has layout
requestAnimationFrame(() => {
  const container = document.querySelector<HTMLElement>("[data-home-illustration]");
  if (!container) {
    console.warn("Lottie: container not found");
    return;
  }
  if (!homeAnimation) {
    console.warn("Lottie: animation JSON missing");
    return;
  }

  lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: homeAnimation as unknown as Record<string, unknown>,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      progressiveLoad: true,
    },
  });
});
