/* =======================================
CORCORAN LIFESTYLE PROPERTIES — main.js
======================================= */

// Mark body so CSS animations only apply when JS is running
document.documentElement.classList.add(‘js-loaded’);

// ── Navbar scroll effect ──
const navbar = document.getElementById(‘navbar’);
if (navbar) {
window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 40);
}, { passive: true });
}

// ── Mobile hamburger ──
const hamburger = document.getElementById(‘hamburger’);
const navLinks  = document.getElementById(‘navLinks’);
if (hamburger && navLinks) {
hamburger.addEventListener(‘click’, () => {
const open = navLinks.classList.toggle(‘open’);
hamburger.setAttribute(‘aria-expanded’, open);
document.body.style.overflow = open ? ‘hidden’ : ‘’;
});
navLinks.querySelectorAll(‘a’).forEach(link => {
link.addEventListener(‘click’, () => {
navLinks.classList.remove(‘open’);
document.body.style.overflow = ‘’;
});
});
}

// ── Scroll-triggered animations ──
function revealOnScroll() {
const targets = document.querySelectorAll(’[data-aos], .model-card, .step, .tcard’);
if (!targets.length) return;

if (‘IntersectionObserver’ in window) {
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
// Small stagger per item
setTimeout(() => {
entry.target.classList.add(‘visible’);
}, 80);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.08, rootMargin: ‘0px 0px -40px 0px’ });

```
targets.forEach(el => observer.observe(el));
```

} else {
// Fallback: show everything immediately
targets.forEach(el => el.classList.add(‘visible’));
}
}

// Run after DOM is ready
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, revealOnScroll);
} else {
revealOnScroll();
}

// ── FAQ accordion ──
document.querySelectorAll(’.faq-q’).forEach(btn => {
btn.addEventListener(‘click’, () => {
const item   = btn.parentElement;
const isOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(i => i.classList.remove(‘open’));
if (!isOpen) item.classList.add(‘open’);
});
});

// ── Hero entry animation ──
(function heroEntry() {
const els = [
document.querySelector(’.hero-badge’),
document.querySelector(’.hero-title’),
document.querySelector(’.hero-sub’),
document.querySelector(’.hero-ctas’),
document.querySelector(’.hero-stats’),
document.querySelector(’.hero-scroll’),
];
els.forEach(el => {
if (!el) return;
el.style.opacity = ‘0’;
el.style.transform = ‘translateY(28px)’;
});
els.forEach((el, i) => {
if (!el) return;
setTimeout(() => {
el.style.transition = ‘opacity 0.8s ease, transform 0.8s ease’;
el.style.opacity = ‘1’;
el.style.transform = ‘none’;
}, 180 + i * 160);
});
})();

// ── Stagger model cards ──
document.querySelectorAll(’.model-card’).forEach((card, i) => {
card.style.transitionDelay = `${i * 0.08}s`;
});
