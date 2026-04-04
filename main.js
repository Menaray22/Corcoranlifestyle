/* ============================================
Corcoran Lifestyle Properties — main.js
============================================ */
‘use strict’;

document.documentElement.classList.add(‘js-loaded’);

/* === HAMBURGER / MOBILE NAV === */
(function initNav() {
const hamburger = document.getElementById(‘hamburger’);
const navLinks  = document.getElementById(‘navLinks’);
const navbar    = document.getElementById(‘navbar’);
if (!hamburger || !navLinks) return;

function openNav() {
navLinks.classList.add(‘open’);
hamburger.classList.add(‘active’);
hamburger.setAttribute(‘aria-expanded’, ‘true’);
document.body.style.overflow = ‘hidden’;
}
function closeNav() {
navLinks.classList.remove(‘open’);
hamburger.classList.remove(‘active’);
hamburger.setAttribute(‘aria-expanded’, ‘false’);
document.body.style.overflow = ‘’;
}

hamburger.addEventListener(‘click’, () =>
navLinks.classList.contains(‘open’) ? closeNav() : openNav()
);
navLinks.querySelectorAll(‘a’).forEach(l => l.addEventListener(‘click’, closeNav));
navLinks.addEventListener(‘click’, e => { if (e.target === navLinks) closeNav(); });
document.addEventListener(‘keydown’, e => { if (e.key === ‘Escape’) closeNav(); });

if (navbar) {
const onScroll = () => navbar.classList.toggle(‘scrolled’, window.scrollY > 50);
window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll();
}
})();

/* === SCROLL REVEAL === */
(function initReveal() {
const sel = ‘[data-aos], .model-card, .step, .tcard, .value-card, .fo-card’;
const all = () => document.querySelectorAll(sel);

if (‘IntersectionObserver’ in window) {
const io = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (!e.isIntersecting) return;
e.target.classList.add(‘visible’);
io.unobserve(e.target);
});
}, { threshold: 0.07, rootMargin: ‘0px 0px -30px 0px’ });
setTimeout(() => all().forEach(el => io.observe(el)), 100);
} else {
all().forEach(el => el.classList.add(‘visible’));
}
})();

/* === HERO ENTRY === */
(function heroEntry() {
const sels = [’.hero-badge’,’.hero-title’,’.hero-sub’,’.hero-ctas’,’.hero-stats’,’.hero-scroll’];
const els  = sels.map(s => document.querySelector(s)).filter(Boolean);
if (!els.length) return;
els.forEach(el => { el.style.opacity = ‘0’; el.style.transform = ‘translateY(28px)’; });
els.forEach((el, i) => setTimeout(() => {
el.style.transition = ‘opacity 0.85s cubic-bezier(.4,0,.2,1), transform 0.85s cubic-bezier(.4,0,.2,1)’;
el.style.opacity    = ‘1’;
el.style.transform  = ‘none’;
}, 150 + i * 140));
})();

/* === CARD STAGGER === */
document.querySelectorAll(’.model-card’).forEach((c, i) => {
c.style.transitionDelay = `${i * 0.07}s`;
});

/* === FAQ ACCORDION === */
document.querySelectorAll(’.faq-q’).forEach(btn => {
btn.addEventListener(‘click’, () => {
const item   = btn.closest(’.faq-item’);
const isOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(i => i.classList.remove(‘open’));
if (!isOpen) item.classList.add(‘open’);
});
});

/* === RENDER ADMIN INVENTORY === */
(function renderInventory() {
const grid     = document.getElementById(‘clp-homes-grid’);
const homes    = window.CLP_HOMES;
const settings = window.CLP_SETTINGS || {};
if (!grid || !homes || !homes.length) return;

const waNum  = (settings.wa || ‘12515010068’).replace(/\D/g, ‘’);
const waBase = ‘https://wa.me/’ + waNum;
const grads  = [
‘linear-gradient(135deg,#8B6914,#D4A853)’,
‘linear-gradient(135deg,#3D5A40,#8B9D5C)’,
‘linear-gradient(135deg,#6B4C3B,#C4956A)’,
‘linear-gradient(135deg,#B85C38,#D4A853)’,
‘linear-gradient(135deg,#2C4230,#5C7A44)’,
];

const featured = homes
.filter(h => h.active !== false && h.featured !== false)
.sort((a, b) => (a.order || 10) - (b.order || 10));

if (!featured.length) return;

const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

grid.innerHTML = featured.map((h, idx) => {
const bg = h.photos && h.photos[0]
? `linear-gradient(to bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.5)),url('${h.photos[0]}') center/cover no-repeat`
: grads[idx % grads.length];
const wa = waBase + ‘?text=’ + encodeURIComponent(h.waMsg || `Hi! I'm interested in ${h.name}. Can you tell me more?`);
return `<div class="model-card visible" style="transition-delay:${idx*0.07}s"> <div class="model-img" style="${bg}"> ${h.badge ?`<div class="model-badge">${h.badge}</div>`: '<div></div>'} <div class="model-tag">${h.type || ''}</div> </div> <div class="model-body"> <h3 class="model-name">${h.name || 'Home'}</h3> <div class="model-specs"> ${h.sqft  ?`<span>📐 ${h.sqft}</span>` : ''} ${h.beds  ?`<span>🛏 ${h.beds} Bed</span>`: ''} ${h.baths ?`<span>🚿 ${h.baths}</span>`: ''} </div> <div class="model-price-row"> <div> <div class="model-price">${h.price || ''}</div> ${h.monthly ?`<div class="model-finance">As low as <strong>${h.monthly}</strong></div>`: ''} </div> ${h.down ?`<div class="model-down">${h.down} Down</div>` : ''} </div> <a href="${wa}" target="_blank" class="btn btn-wa w-full">${WA_SVG} Inquire on WhatsApp</a> </div> </div>`;
}).join(’’) + ` <div class="model-card cta-card visible" style="transition-delay:${featured.length*0.07}s"> <div class="cta-card-inner"> <div class="cta-icon">🏡</div> <h3>Don't See What You Need?</h3> <p>We have more inventory. Message us and we'll find your perfect home.</p> <a href="${waBase}?text=${encodeURIComponent("Hi! I'd like to see more home options.")}" target="_blank" class="btn btn-wa">Chat on WhatsApp</a> </div> </div>`;
})();
