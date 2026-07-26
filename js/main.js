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

/* Animación fade-in al hacer scroll */
function setupScrollReveal() {
  const targets = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
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
  setupScrollReveal();
  setupMenuAnchorNav();
  setupFooterYear();
});
