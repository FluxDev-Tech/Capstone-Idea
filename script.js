// === THEME TOGGLE ===
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// === APPLY SAVED THEME ON LOAD ===
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  if (toggleBtn) toggleBtn.innerHTML = savedTheme === "dark" ? "🌙" : "☀️";
});

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.innerHTML = newTheme === "dark" ? "🌙" : "☀️";
  });
}

// === TYPING ANIMATION ===
const typeTarget = document.getElementById("typed");
if (typeTarget && typeof Typed !== "undefined") {
  new Typed("#typed", {
    strings: ["Arduino Capstone Projects", "Smart Tech Ideas", "Innovative Builds"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  });
}

// === SCROLL REVEAL ===
if (typeof ScrollReveal !== "undefined") {
  ScrollReveal({
    distance: "50px",
    duration: 800,
    easing: "ease-in-out",
    origin: "bottom",
    reset: false,
  }).reveal(".reveal", {
    interval: 100,
  });
}

// === MOBILE NAV TOGGLE ===
const menuToggle = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

// === LOAD PROJECTS ===
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const details = document.getElementById("details");

  if (!gallery || typeof projects === "undefined" || !Array.isArray(projects)) return;

  gallery.innerHTML = "";
  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;
    card.addEventListener("click", () => showDetails(project));
    gallery.appendChild(card);
  });

  function showDetails(project) {
    if (!details) return;

    details.innerHTML = `
      <div class="project-details">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <h4>🛠️ Hardware Used</h4>
        <ul>${project.hardware.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h4>🧰 Tech Stack</h4>
        <ul>${project.stack.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h4>📄 Sample Code</h4>
        <pre><code>${project.code}</code></pre>
      </div>
    `;
    details.scrollIntoView({ behavior: "smooth" });
  }
});
