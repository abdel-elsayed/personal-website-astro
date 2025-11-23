import lottie from "lottie-web";
import projectsAnimation from "../assets/data.json";
import mouseAnimation from "../assets/LottieMouse.json";

requestAnimationFrame(() => {
  const hero = document.querySelector<HTMLElement>("[data-lottie='projects-hero']");
  const mouse = document.querySelector<HTMLElement>("[data-lottie='mouse-pointer']");

  if (hero) {
    lottie.loadAnimation({
      container: hero,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: projectsAnimation as unknown as Record<string, unknown>,
    });
  }

  if (mouse) {
    lottie.loadAnimation({
      container: mouse,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: mouseAnimation as unknown as Record<string, unknown>,
    });
  }
});
