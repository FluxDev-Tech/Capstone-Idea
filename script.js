// ==== ELEMENTS ====
const gallery = document.getElementById("gallery");
const details = document.getElementById("details");
const themeToggle = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ==== RENDER GALLERY ====
function renderGallery() {
  gallery.innerHTML = projects.map((project, index) => `
    <div class="card" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
    </div>
  `).join('');
}

// ==== SHOW PROJECT DETAILS ====
function showDetails(index) {
  const project = projects[index];
  details.innerHTML = `
    <div class="card details-card">
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <h4>🔧 Hardware Used:</h4>
      <ul>${project.hardware.map(item => `<li>${item}</li>`).join('')}</ul>
      <h4>💻 Sample Code:</h4>
      <pre><code>${project.code}</code></pre>
      <button class="close-btn" onclick="closeDetails()">Close</button>
    </div>
  `;
  details.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeDetails() {
  details.innerHTML = "";
}

// ==== THEME TOGGLE ====
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

// ==== MOBILE MENU ====
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ==== INITIALIZE ====
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
});
