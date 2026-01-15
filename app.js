/* ======================
   HELPER FUNCTION
====================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/* ======================
   MOBILE MENU
====================== */
const menuBtn = $(".menu-btn");
const menu = $(".menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

/* ======================
   DARK MODE (with localStorage)
====================== */
const themeBtn = $(".theme-toggle");

// load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ======================
   SMOOTH SCROLL
====================== */
$$(".menu a").forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (!targetId.startsWith("#")) return;

    const target = $(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    menu?.classList.remove("open");
    menuBtn && (menuBtn.textContent = "☰");
  });
});

/* ======================
   SCROLL ANIMATIONS
====================== */
const fades = $$(".fade");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fades.forEach(el => observer.observe(el));
} else {
  fades.forEach(el => el.classList.add("show"));
}

/* ======================
   CONTACT FORM
====================== */
const form = $("#contactForm");
const statusText = $(".form-status");

if (form && statusText) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    statusText.textContent = "Sending...";
    statusText.className = "form-status";

    setTimeout(() => {
      statusText.textContent = "Message sent successfully 🎉";
      statusText.classList.add("success");
      form.reset();
    }, 1200);
  });
}

/* ======================
   PRICING SELECT
====================== */
$$(".select-plan").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".pricing .card").forEach(card =>
      card.classList.remove("selected")
    );

    const card = btn.closest(".card");
    card?.classList.add("selected");

    console.log(`Selected plan: ${btn.dataset.plan}`);
  });
});
