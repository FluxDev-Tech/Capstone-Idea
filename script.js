// === THEME TOGGLE ===
const toggleBtn = document.getElementById('themeToggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleBtn.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
});

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  toggleBtn.innerHTML = savedTheme === 'dark' ? '🌙' : '☀️';
});

// === TYPING ANIMATION ===
const typeTarget = document.getElementById('typed');
if (typeTarget) {
  new Typed('#typed', {
    strings: ['Arduino Capstone Projects', 'Smart Tech Ideas', 'Innovative Builds'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
}

// === SCROLL REVEAL ===
ScrollReveal({
  distance: '50px',
  duration: 800,
  easing: 'ease-in-out',
  origin: 'bottom',
  reset: false
}).reveal('.reveal', {
  interval: 100
});

// === MOBILE NAV TOGGLE ===
const menuToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// === LOAD PROJECTS (project.js) ===
window.addEventListener('DOMContentLoaded', () => {
  if (typeof projects !== 'undefined' && Array.isArray(projects)) {
    const gallery = document.querySelector('.gallery');
    if (gallery) {
      gallery.innerHTML = ''; // Clear existing cards
      projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card reveal';
        card.innerHTML = `
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          <p><strong>Tech:</strong> ${proj.techStack}</p>
          <p><strong>Hardware:</strong> ${proj.hardware}</p>
        `;
        gallery.appendChild(card);
      });
    }
  }
});
            
