// Elements
const gallery = document.getElementById("gallery");
const details = document.getElementById("details");
const themeToggle = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Render Project Cards Horizontally
function renderGallery() {
  gallery.innerHTML = projects.map((project, index) => `
    <div class="card" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px;">
      <h3>${project.title}</h3>
    </div>
  `).join('');
}

// Show Project Detail (modal style)
function showDetails(index) {
  const project = projects[index];
  details.innerHTML = `
    <div class="card" style="margin-top: 2rem;">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <h4>Hardware:</h4>
      <ul>${project.hardware.map(item => `<li>${item}</li>`).join('')}</ul>
      <h4>Sample Code:</h4>
      <pre><code>${project.code}</code></pre>
      <button onclick="details.innerHTML = ''" style="margin-top: 1rem;">Close</button>
    </div>
  `;
  details.scrollIntoView({ behavior: "smooth" });
}

function showDetails(index) {
  const project = projects[index];
  details.innerHTML = `
    <div class="card">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 12px; margin-bottom: 1rem;">
      <h3>${project.title}</h3>
      <p style="margin: 1rem 0;">${project.description}</p>
      <h4>🔧 Hardware Used:</h4>
      <ul>
        ${project.hardware.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <h4>💻 Sample Code:</h4>
      <pre><code>${project.code}</code></pre>
      <button onclick="details.innerHTML = ''" class="close-btn">Close</button>
    </div>
  `;

  // Scroll to the details section
  document.getElementById("details").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Theme Toggle (Dark/Light)
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

// Hamburger Toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// On Load
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
});
