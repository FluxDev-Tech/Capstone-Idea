const gallery = document.getElementById("gallery");
const details = document.getElementById("details");

function renderGallery() {
  gallery.innerHTML = projects.map((project, index) => `
    <div class="card" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${project.title}" />
      <div class="card-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </div>
  `).join('');
}

function showDetails(index) {
  const p = projects[index];
  gallery.style.display = "none";
  details.classList.add("active");
  window.scrollTo({ top: 0, behavior: 'smooth' });

  details.innerHTML = `
    <div class="back-btn" onclick="goBack()">← Back to Projects</div>
    <h2>${p.title}</h2>
    <p>${p.description}</p>
    <div class="section">
      <strong>Hardware Components:</strong>
      <ul>${p.hardware.map(h => `<li>${h}</li>`).join('')}</ul>
    </div>
    <div class="section">
      <strong>Tech Stack:</strong>
      <ul>${p.stack.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
    <div class="section">
      <strong>Sample Code:</strong>
      <pre><code>${highlightCode(p.code)}</code></pre>
    </div>
  `;
}

function goBack() {
  details.classList.remove("active");
  gallery.style.display = "flex";
  window.scrollTo({ top: gallery.offsetTop, behavior: 'smooth' });
}

function highlightCode(code) {
  return code
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(int|float|char|if|else|for|void|return|const)/g, '<span style="color:#00ffe1;">$1</span>')
    .replace(/"(.*?)"/g, '<span style="color:#ffc107;">"$1"</span>');
}

// Load gallery on page load
document.addEventListener("DOMContentLoaded", renderGallery);
