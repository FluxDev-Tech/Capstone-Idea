const gallery = document.getElementById("gallery");
const details = document.getElementById("details");

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[tag]
  ));
}

function renderGallery() {
  if (!gallery) return;
  gallery.innerHTML = projects.map((project, index) => `
    <div class="card" onclick="showDetails(${index})">
      <img src="${project.image}" alt="${escapeHTML(project.title)}" />
      <div class="card-body">
        <div class="card-title">${escapeHTML(project.title)}</div>
        <div class="card-desc">${escapeHTML(project.description)}</div>
      </div>
    </div>
  `).join('');
}

function showDetails(index) {
  const p = projects[index];
  if (!p || !details) return;

  gallery.classList.add("hidden");
  details.classList.add("active");

  const hardwareList = p.hardware.map(h => `<li>${escapeHTML(h)}</li>`).join('');
  const stackList = p.stack.map(s => `<li>${escapeHTML(s)}</li>`).join('');
  const safeCode = escapeHTML(p.code);

  details.innerHTML = `
    <div class="back-btn" onclick="goBack()">← Back to Projects</div>
    <h2>${escapeHTML(p.title)}</h2>
    <p>${escapeHTML(p.description)}</p>
    <div class="section">
      <strong>Hardware Components:</strong>
      <ul>${hardwareList}</ul>
    </div>
    <div class="section">
      <strong>Tech Stack:</strong>
      <ul>${stackList}</ul>
    </div>
    <div class="section">
      <strong>Sample Code:</strong>
      <pre><code>${safeCode}</code></pre>
    </div>
  `;
}

function goBack() {
  if (!gallery || !details) return;
  details.classList.remove("active");
  gallery.classList.remove("hidden");
}

renderGallery();
