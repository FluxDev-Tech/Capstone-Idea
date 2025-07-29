<script>
  // ===== 1. Mobile Navigation Toggle =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ===== 2. Theme Toggle Support =====
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ===== 3. Responsive Card Size Adjustment =====
  function adjustCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (window.innerWidth < 600) {
        card.style.minWidth = '180px';
        card.style.maxWidth = '220px';
      } else if (window.innerWidth < 1024) {
        card.style.minWidth = '220px';
        card.style.maxWidth = '250px';
      } else {
        card.style.minWidth = '240px';
        card.style.maxWidth = '280px';
      }
    });
  }

  window.addEventListener('resize', adjustCards);
  window.addEventListener('load', adjustCards);

  // ===== 4. Gallery Drag Scroll (Mobile UX) =====
  const galleries = document.querySelectorAll('.gallery');
  galleries.forEach(gallery => {
    let isDown = false;
    let startX, scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.classList.add('dragging');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.classList.remove('dragging');
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.classList.remove('dragging');
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });
</script>
