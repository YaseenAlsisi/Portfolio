  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
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

// Project card tilt
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
