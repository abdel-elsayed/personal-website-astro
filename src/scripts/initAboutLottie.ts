import lottie from "lottie-web";
import mouseAnimation from "../assets/LottieMouse.json";

requestAnimationFrame(() => {
  const mouse = document.querySelector<HTMLElement>("[data-lottie='mouse-pointer']");
  if (!mouse) return;
  lottie.loadAnimation({
    container: mouse,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: mouseAnimation as unknown as Record<string, unknown>,
  });
});
