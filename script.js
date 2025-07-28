const gallery = document.getElementById("gallery");
const details = document.getElementById("details");

function renderGallery() {
  gallery.innerHTML = projects.map((project, index) => `
    <div class="card" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${project.title}" />
      <div class="card-body">
        <div class="card-title">${project.title}</div>
        <div class="card-desc">${project.description}</div>
      </div>
    </div>
  `).join('');
}

function showDetails(index) {
  const p = projects[index];
  gallery.classList.add("hidden"); // hide horizontal scroll layout
  details.classList.add("active");

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
      <pre><code>${p.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>
  `;
}

function goBack() {
  details.classList.remove("active");
  gallery.classList.remove("hidden"); // restore horizontal gallery
}

renderGallery();
