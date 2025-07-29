// === THEME TOGGLE ===
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;
const gallery = document.getElementById("gallery");
const details = document.getElementById("details");

function renderGallery() {
  if (!Array.isArray(projects)) return;
  gallery.innerHTML = projects.map((project, index) => `
    <div class="project-card reveal" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
    </div>
  `).join("");
}

function showDetails(index) {
  const project = projects[index];
  details.innerHTML = `
    <div class="details-card">
      <img src="${project.image}" alt="${project.title}" onclick="goBack()" />
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <p><strong>Hardware:</strong> ${Array.isArray(project.hardware) ? project.hardware.join(", ") : project.hardware}</p>
      <p><strong>Tech Stack:</strong> ${Array.isArray(project.stack) ? project.stack.join(", ") : project.techStack}</p>
      <pre><code>${project.code}</code></pre>
    </div>
  `;
  details.style.display = "block";
  details.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goBack() {
  details.style.display = "none";
  gallery.scrollIntoView({ behavior: "smooth", block: "start" });
}

// === APPLY SAVED THEME ON LOAD ===
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  if (toggleBtn) toggleBtn.innerHTML = savedTheme === "dark" ? "🌙" : "☀️";

  // === LOAD PROJECTS ON PAGE LOAD ===
  renderGallery();
});

// === THEME TOGGLE CLICK ===
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
