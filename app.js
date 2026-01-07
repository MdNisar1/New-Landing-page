// MOBILE MENU
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.textContent = menu.classList.contains("open") ? "✕" : "☰";
});

// DARK MODE
const themeBtn = document.querySelector(".theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// SMOOTH SCROLL
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    menu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// SCROLL ANIMATIONS
const fades = document.querySelectorAll(".fade");
const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
});
fades.forEach(el => io.observe(el));

// CONTACT FORM
const form = document.querySelector("#contactForm");
const statusText = document.querySelector(".form-status");

form.addEventListener("submit", e => {
  e.preventDefault();
  statusText.textContent = "Sending...";
  setTimeout(() => {
    statusText.textContent = "Message sent successfully 🎉";
    statusText.classList.add("success");
    form.reset();
  }, 1200);
});

// PRICING SELECT
document.querySelectorAll(".select-plan").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pricing .card").forEach(c => c.classList.remove("selected"));
    btn.closest(".card").classList.add("selected");
    alert(`You selected: ${btn.dataset.plan}`);
  });
});
