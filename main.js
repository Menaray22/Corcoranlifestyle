/* =======================================
CORCORAN LIFESTYLE PROPERTIES — main.js
======================================= */

// ── Navbar scroll effect ──
const navbar = document.getElementById(‘navbar’);
if (navbar) {
window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 40);
});
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
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
setTimeout(() => entry.target.classList.add(‘visible’), i * 100);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

document.querySelectorAll(’[data-aos], .model-card, .step, .tcard’).forEach(el => {
observer.observe(el);
});

// ── FAQ accordion ──
document.querySelectorAll(’.faq-q’).forEach(btn => {
btn.addEventListener(‘click’, () => {
const item   = btn.parentElement;
const isOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(i => i.classList.remove(‘open’));
if (!isOpen) item.classList.add(‘open’);
});
});

// ── Smooth hero entry ──
(function heroEntry() {
const badge   = document.querySelector(’.hero-badge’);
const title   = document.querySelector(’.hero-title’);
const sub     = document.querySelector(’.hero-sub’);
const ctas    = document.querySelector(’.hero-ctas’);
const stats   = document.querySelector(’.hero-stats’);
const scroll  = document.querySelector(’.hero-scroll’);
const delay   = (el, ms, cls = ‘visible’) => el && setTimeout(() => el.style.cssText = ‘opacity:1;transform:none;transition:opacity 0.8s ease,transform 0.8s ease’, ms);
[badge, title, sub, ctas, stats, scroll].forEach(el => {
if (el) { el.style.opacity = ‘0’; el.style.transform = ‘translateY(28px)’; }
});
delay(badge, 200);
delay(title, 380);
delay(sub,   540);
delay(ctas,  680);
delay(stats, 820);
delay(scroll,1000);
})();

// ── Stagger model cards ──
document.querySelectorAll(’.model-card’).forEach((card, i) => {
card.style.transitionDelay = `${i * 0.1}s`;
});
