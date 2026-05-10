/* ===== TkOff Pro Landing — script.js ===== */

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Mobile hamburger ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.textContent = '☰';
  });
});

// ---------- Scroll reveal (Intersection Observer) ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Animated blueprint grid background ----------
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, cols, rows;
  const spacing = 50;

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
    cols = Math.ceil(w / spacing) + 1;
    rows = Math.ceil(h / spacing) + 1;
  }
  resize();
  window.addEventListener('resize', resize);

  let time = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Blueprint grid
    for (let i = 0; i < cols; i++) {
      const x = i * spacing;
      const alpha = 0.04 + 0.02 * Math.sin(time * 0.8 + i * 0.3);
      ctx.strokeStyle = `rgba(37, 93, 173, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let j = 0; j < rows; j++) {
      const y = j * spacing;
      const alpha = 0.04 + 0.02 * Math.sin(time * 0.8 + j * 0.3);
      ctx.strokeStyle = `rgba(37, 93, 173, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Floating dots at intersections
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        const pulse = Math.sin(time + i * 0.5 + j * 0.5) * 0.5 + 0.5;
        const r = 1 + pulse * 1.2;
        const a = 0.06 + pulse * 0.08;
        ctx.fillStyle = `rgba(253, 108, 0, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Glowing scan line
    const scanY = (time * 30) % h;
    const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    grad.addColorStop(0, 'rgba(253, 108, 0, 0)');
    grad.addColorStop(0.5, 'rgba(253, 108, 0, 0.04)');
    grad.addColorStop(1, 'rgba(253, 108, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 40, w, 80);

    time += 0.012;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ---------- Smooth anchor scrolling (fallback) ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
