  // Custom cursor - disabled on mobile
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  
  if (!isMobile) {
    let mx = 1000, my = 1000, rx = 1000, ry = 1000;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      rx += (mx - rx) * 1;
      ry += (my - ry) * 1;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  } else {
    // Hide cursor elements on mobile
    cursor.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

// Project card tilt - disabled on mobile
if (!isMobile) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        "--mx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      card.style.setProperty(
        "--my",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    });
  });
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add(".visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveal, .timeline-item, .project-card")
  .forEach((el) => observer.observe(el));

const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  localStorage.setItem('theme', theme);
}

if (themeToggle) {
  applyTheme(initialTheme);
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
} else {
  applyTheme(initialTheme);
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}
