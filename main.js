/* ============================================================
Corcoran Lifestyle Properties — main.js  v4
============================================================ */
‘use strict’;

/* ── flag for CSS reveal animations ── */
document.documentElement.classList.add(‘js’);

/* ══════════════════════════════════════
NAV: scroll + hamburger
══════════════════════════════════════ */
(function () {
var nav       = document.getElementById(‘nav’);
var hamburger = document.getElementById(‘hamburger’);
var navLinks  = document.getElementById(‘navLinks’);
if (!hamburger || !navLinks) return;

/* scroll class */
if (nav) {
var onScroll = function () {
nav.classList.toggle(‘scrolled’, window.scrollY > 48);
};
window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll();
}

/* open / close helpers */
function openMenu() {
navLinks.classList.add(‘open’);
hamburger.classList.add(‘open’);
hamburger.setAttribute(‘aria-expanded’, ‘true’);
hamburger.setAttribute(‘aria-label’, ‘Close menu’);
document.body.style.overflow = ‘hidden’;
}
function closeMenu() {
navLinks.classList.remove(‘open’);
hamburger.classList.remove(‘open’);
hamburger.setAttribute(‘aria-expanded’, ‘false’);
hamburger.setAttribute(‘aria-label’, ‘Open menu’);
document.body.style.overflow = ‘’;
}

hamburger.addEventListener(‘click’, function () {
navLinks.classList.contains(‘open’) ? closeMenu() : openMenu();
});

/* close when a nav link is tapped */
navLinks.querySelectorAll(‘a’).forEach(function (a) {
a.addEventListener(‘click’, closeMenu);
});

/* close on Escape */
document.addEventListener(‘keydown’, function (e) {
if (e.key === ‘Escape’) closeMenu();
});

/* close when clicking the backdrop (the overlay itself, not the links) */
navLinks.addEventListener(‘click’, function (e) {
if (e.target === navLinks) closeMenu();
});
})();

/* ══════════════════════════════════════
SCROLL REVEAL  (IntersectionObserver)
══════════════════════════════════════ */
(function () {
var sel = ‘.card, .step, .tcard, .inv-num, [data-aos], .reveal’;

function markAll() {
document.querySelectorAll(sel).forEach(function (el) {
el.classList.add(‘in’);
});
}

if (!(‘IntersectionObserver’ in window)) {
markAll();
return;
}

var io = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return;
entry.target.classList.add(‘in’);
io.unobserve(entry.target);
});
}, { threshold: 0.07, rootMargin: ‘0px 0px -24px 0px’ });

/* Small delay so the page paints before we observe */
setTimeout(function () {
document.querySelectorAll(sel).forEach(function (el) {
io.observe(el);
});
}, 80);
})();

/* ══════════════════════════════════════
HERO ENTRY ANIMATION
══════════════════════════════════════ */
(function () {
var items = [
‘.hero-eyebrow’, ‘.hero-h1’, ‘.hero-sub’,
‘.hero-actions’, ‘.hero-stats’, ‘.hero-scroll’
].map(function (s) { return document.querySelector(s); })
.filter(Boolean);

if (!items.length) return;

items.forEach(function (el) {
el.style.opacity   = ‘0’;
el.style.transform = ‘translateY(26px)’;
});

items.forEach(function (el, i) {
setTimeout(function () {
el.style.transition = ‘opacity .85s cubic-bezier(.4,0,.2,1), transform .85s cubic-bezier(.4,0,.2,1)’;
el.style.opacity    = ‘1’;
el.style.transform  = ‘none’;
}, 140 + i * 130);
});
})();

/* ══════════════════════════════════════
CARD STAGGER DELAY
══════════════════════════════════════ */
document.querySelectorAll(’.card’).forEach(function (card, i) {
card.style.transitionDelay = (i * 0.07) + ‘s’;
});

/* ══════════════════════════════════════
FAQ ACCORDION
══════════════════════════════════════ */
document.querySelectorAll(’.faq-q’).forEach(function (btn) {
btn.addEventListener(‘click’, function () {
var item   = btn.closest(’.faq-item’);
var isOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(function (i) {
i.classList.remove(‘open’);
i.querySelector(’.faq-q’).setAttribute(‘aria-expanded’, ‘false’);
});
if (!isOpen) {
item.classList.add(‘open’);
btn.setAttribute(‘aria-expanded’, ‘true’);
}
});
});

/* ══════════════════════════════════════
RENDER ADMIN INVENTORY
(reads window.CLP_HOMES from inventory.js)
══════════════════════════════════════ */
(function () {
var grid  = document.getElementById(‘clp-homes-grid’);
var homes = window.CLP_HOMES;
var cfg   = window.CLP_SETTINGS || {};

/* Only replace if admin has added homes */
if (!grid || !homes || !homes.length) return;

var waNum  = (cfg.wa || ‘12515010068’).replace(/\D/g, ‘’);
var waBase = ‘https://wa.me/’ + waNum;

var GRADS = [
‘linear-gradient(135deg,#8B6914,#D4A853)’,
‘linear-gradient(135deg,#3D5A40,#8B9D5C)’,
‘linear-gradient(135deg,#6B4C3B,#C4956A)’,
‘linear-gradient(135deg,#B85C38,#D4A853)’,
‘linear-gradient(135deg,#2C4230,#5C7A44)’
];

var WA_ICO = ‘<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>’;

var featured = homes
.filter(function (h) { return h.active !== false && h.featured !== false; })
.sort(function (a, b) { return (a.order || 10) - (b.order || 10); });

if (!featured.length) return;

var html = featured.map(function (h, idx) {
var bg = (h.photos && h.photos[0])
? ‘linear-gradient(to bottom,rgba(0,0,0,.06),rgba(0,0,0,.48)),url('’ + h.photos[0] + ‘') center/cover no-repeat’
: GRADS[idx % GRADS.length];

```
var wa  = waBase + '?text=' + encodeURIComponent(
  h.waMsg || 'Hi! I\'m interested in ' + h.name + '. Can you tell me more?'
);

return '<article class="card in" style="transition-delay:' + (idx * 0.07) + 's">'
  + '<div class="card-img" style="' + bg + '">'
  + (h.badge ? '<span class="card-badge">' + h.badge + '</span>' : '<span></span>')
  + '<span class="card-type">' + (h.type || '') + '</span>'
  + '</div>'
  + '<div class="card-body">'
  + '<h3 class="card-name">' + (h.name || 'Home') + '</h3>'
  + '<div class="card-specs">'
  + (h.sqft  ? '<span>📐 ' + h.sqft  + '</span>' : '')
  + (h.beds  ? '<span>🛏 ' + h.beds  + ' Bed</span>' : '')
  + (h.baths ? '<span>🚿 ' + h.baths + '</span>' : '')
  + '</div>'
  + '<div class="card-pricing">'
  + '<div>'
  + '<div class="card-price">' + (h.price || '') + '</div>'
  + (h.monthly ? '<div class="card-mo">As low as <strong>' + h.monthly + '</strong></div>' : '')
  + '</div>'
  + (h.down ? '<div class="card-down">' + h.down + ' Down</div>' : '')
  + '</div>'
  + '<a href="' + wa + '" target="_blank" rel="noopener" class="btn btn-wa btn-full">'
  + WA_ICO + ' Inquire on WhatsApp</a>'
  + '</div></article>';
```

}).join(’’);

/* CTA card at end */
html += ‘<article class="card card-cta in" style="transition-delay:' + (featured.length * 0.07) + 's">’
+ ‘<div class="card-cta-inner">’
+ ‘<div class="card-cta-icon">🏡</div>’
+ ‘<h3>Don't See What You Need?</h3>’
+ ‘<p>We have more inventory and can source custom models. Message us.</p>’
+ ‘<a href=”’ + waBase + ‘?text=’ + encodeURIComponent(“Hi! I’d like to see more home options.”) + ‘” target=”_blank” rel=“noopener” class=“btn btn-wa”>Chat on WhatsApp</a>’
+ ‘</div></article>’;

grid.innerHTML = html;
})();
