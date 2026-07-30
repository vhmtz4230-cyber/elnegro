/* ============================================
   TAQUERÍA EL NEGRO — main.js
   ------------------------------------------------
   DATOS EDITABLES
   Cambia estas constantes cuando tengas los datos
   reales del negocio. Se inyectan automáticamente
   en todos los elementos [data-config="..."] del
   sitio (header, footer, ubicación, menú, etc.)
   ------------------------------------------------ */
const CONFIG = {
  PHONE_TEL: "+525556639668",
  PHONE_DISPLAY: "55 5563 9668",
  // REEMPLAZAR: URL de "Cómo llegar" de Google Maps (compartir > copiar enlace desde la ficha real)
  GOOGLE_MAPS_DIRECTIONS_URL: "https://www.google.com/maps/dir/?api=1&destination=Taqueria+EL+NEGRO+Felix+Parra+10B+San+Jose+Insurgentes+CDMX",
  // REEMPLAZAR: URL directa a las reseñas de la ficha de Google del negocio
  GOOGLE_REVIEWS_URL: "https://www.google.com/search?q=Taqueria+EL+NEGRO+San+Jose+Insurgentes+reseñas",
  // REEMPLAZAR: usuario/URL real de Instagram
  INSTAGRAM_URL: "https://www.instagram.com/taqueriaelnegro/",
  // REEMPLAZAR: URL real de la página de Facebook
  FACEBOOK_URL: "https://www.facebook.com/taqueriaelnegro/",
  // URL real de Uber Eats
  UBER_EATS_URL: "https://www.ubereats.com/mx/store/taqueria-el-negro/o5hJD8otQDepe-_8cUxgRQ",
};

/* Inyecta los datos de CONFIG en cualquier elemento marcado con data-config */
function applyConfig() {
  document.querySelectorAll('[data-config="tel-href"]').forEach((el) => {
    el.setAttribute("href", `tel:${CONFIG.PHONE_TEL}`);
  });

  document.querySelectorAll('[data-config="phone-display"]').forEach((el) => {
    el.textContent = CONFIG.PHONE_DISPLAY;
  });

  document.querySelectorAll('[data-config="maps-href"]').forEach((el) => {
    el.setAttribute("href", CONFIG.GOOGLE_MAPS_DIRECTIONS_URL);
  });

  document.querySelectorAll('[data-config="reviews-href"]').forEach((el) => {
    el.setAttribute("href", CONFIG.GOOGLE_REVIEWS_URL);
  });

  document.querySelectorAll('[data-config="instagram-href"]').forEach((el) => {
    el.setAttribute("href", CONFIG.INSTAGRAM_URL);
  });

  document.querySelectorAll('[data-config="facebook-href"]').forEach((el) => {
    el.setAttribute("href", CONFIG.FACEBOOK_URL);
  });

  document.querySelectorAll('[data-config="ubereats-href"]').forEach((el) => {
    el.setAttribute("href", CONFIG.UBER_EATS_URL);
  });
}

/* Menú hamburguesa (móvil) */
function setupMobileNav() {
  const toggle = document.querySelector(".hamburger");
  const nav = document.querySelector(".mobile-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Animaciones GSAP ---------- */

function initHeroIntro() {
  const bg = document.querySelector(".hero-bg");
  const eyebrow = document.querySelector(".hero-eyebrow");
  const mark = document.querySelector(".hero-logo-mark");
  const paragraph = document.querySelector(".hero p");
  const actions = gsap.utils.toArray(".hero-actions > *");

  if (bg) {
    gsap.fromTo(bg, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power2.out" });
  }

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  if (eyebrow) {
    gsap.set(eyebrow, { opacity: 0, y: 16 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
  }
  if (mark) {
    gsap.set(mark, { opacity: 0, scale: 0.9, y: 16 });
    tl.to(mark, { opacity: 1, scale: 1, y: 0, duration: 0.9 }, 0.45);
  }
  if (paragraph) {
    gsap.set(paragraph, { opacity: 0, y: 18 });
    tl.to(paragraph, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
  }
  if (actions.length) {
    gsap.set(actions, { opacity: 0, y: 16 });
    tl.to(actions, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.9);
  }
}

function initScrollReveal(revealEls) {
  gsap.set(revealEls, { opacity: 0, y: 36, scale: 0.97 });
  ScrollTrigger.batch(revealEls, {
    start: "top 85%",
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.1,
      overwrite: true,
    }),
  });
}

// Botones magnéticos: solo en dispositivos con cursor real (evita que un tap
// en móvil deje el botón "atorado" en el estado de hover).
function initMagneticButtons() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  document.querySelectorAll(".btn").forEach((btn) => {
    const strength = 0.3;
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: relX * strength,
        y: relY * strength - 2,
        scale: 1.04,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.35)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("blur", onLeave);
  });
}

// Zoom sutil en las fotos de platillos y galería al pasar el cursor.
function initCardHoverZoom() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  document.querySelectorAll(".dish-card-photo, .gallery-item.has-photo").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;
    const enter = () => gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power3.out" });
    const leave = () => gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
    frame.addEventListener("mouseenter", enter);
    frame.addEventListener("mouseleave", leave);
  });
}

// Cuenta regresiva del 0 al 4.5 cuando la calificación entra en pantalla.
function initReviewCounter() {
  const el = document.querySelector(".reviews-score");
  if (!el) return;
  const target = parseFloat(el.textContent.trim());
  if (Number.isNaN(target)) return;

  const counter = { value: 0 };
  gsap.to(counter, {
    value: target,
    duration: 1.4,
    ease: "power2.out",
    onUpdate: () => { el.textContent = counter.value.toFixed(1); },
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
  });
}

function initGsapAnimations() {
  const revealEls = document.querySelectorAll(".fade-in");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsapReady = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  // Sin GSAP (falló la carga) o con reduced-motion: mostrar todo directo, sin animar.
  if (!gsapReady || reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  initHeroIntro();
  initScrollReveal(revealEls);
  initMagneticButtons();
  initCardHoverZoom();
  initReviewCounter();

  // Las fotos lazy-load cambian el alto del documento: recalcular posiciones de trigger.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/* Resalta la sección activa en la navegación de anclas del menú (menu.html) */
function setupMenuAnchorNav() {
  const nav = document.querySelector(".menu-anchor-nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll("a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = links.find(
          (l) => l.getAttribute("href") === `#${entry.target.id}`
        );
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* Año actual en el footer */
function setupFooterYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setupMobileNav();
  initGsapAnimations();
  setupMenuAnchorNav();
  setupFooterYear();
});
