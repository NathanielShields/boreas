// ── Scroll reveal ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ── Active nav link ───────────────────────────────────
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Hamburger (mobile) ─────────────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
if (hamburger) {
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <style>
      .mobile-menu {
        position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
        background: rgba(8,9,13,0.97); backdrop-filter: blur(20px);
        z-index: 999; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 1.75rem;
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .mobile-menu.open { opacity: 1; pointer-events: all; }
      .mobile-menu a {
        font-family: 'Outfit', sans-serif; font-size: 1.6rem;
        font-weight: 700; color: #f1f5f9; transition: color 0.15s;
      }
      .mobile-menu a:hover { color: #f97316; }
      .mobile-menu a.active { color: #f97316; }
    </style>
    <a href="index.html">Home</a>
    <a href="problem.html">The Problem</a>
    <a href="solutions.html">Solutions</a>
    <a href="sensing.html">Sensing Platform</a>
    <a href="platform.html">Full Platform</a>
  `;
  document.body.appendChild(mobileMenu);

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // close on nav
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ── Nav scroll shadow ──────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Counter animation ──────────────────────────────────
function animateCounter(el, target, suffix = '', decimals = 0) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (eased * target).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-counter]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const val = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const dec = parseInt(el.dataset.decimals || '0');
      animateCounter(el, val, suffix, dec);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));
