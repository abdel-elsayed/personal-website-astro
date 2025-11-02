import AOS from "aos";
import "aos/dist/aos.css";

const init = () => {
  AOS.init({ duration: 600, once: true });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
