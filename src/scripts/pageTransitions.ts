const DURATION = 100; // ms

function isSamePageLink(a: HTMLAnchorElement): boolean {
  if (a.target && a.target !== "_self") return false;
  if (a.hasAttribute("download")) return false;
  if (a.origin !== location.origin) return false;
  // Allow hash-only changes without transition
  const toUrl = new URL(a.href);
  const fromUrl = new URL(location.href);
  if (toUrl.pathname === fromUrl.pathname && toUrl.search === fromUrl.search) return false;
  return true;
}

function fadeIn() {
  const el = document.body; // fade the main page content
  el.style.transition = `opacity ${DURATION}ms ease`;
  el.style.opacity = "1";
}

function fadeOut(): Promise<void> {
  return new Promise((resolve) => {
    const el = document.body;
    el.style.transition = `opacity ${DURATION}ms ease`;
    el.style.opacity = "0";
    const done = () => {
      el.removeEventListener("transitionend", done);
      resolve();
    };
    el.addEventListener("transitionend", done);
    // Fallback in case transitionend doesn't fire
    window.setTimeout(done, DURATION + 50);
  });
}

// Initialize on first load
(function init() {
  const boot = () => {
    const el = document.body;
    // Start transparent, then fade in after paint
    el.style.opacity = "0";
    el.style.willChange = "opacity";
    requestAnimationFrame(fadeIn);

    // Intercept clicks
    document.addEventListener("click", (e) => {
      const a = (e.target as Element)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      // Respect modifier keys and non-left clicks
      const me = e as MouseEvent;
      if (me.button !== 0 || me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
      if (!isSamePageLink(a)) return;

      e.preventDefault();
      const href = a.href;
      fadeOut().then(() => {
        location.href = href;
      });
    });

    // Fade in on back/forward cache restore
    window.addEventListener("pageshow", (ev) => {
      if ((ev as PageTransitionEvent).persisted) {
        requestAnimationFrame(fadeIn);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
