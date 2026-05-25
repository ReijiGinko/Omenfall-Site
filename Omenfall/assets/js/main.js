/* ============================================================
   OMENFALL — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

// ── Utility ──────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Hero Slideshow ───────────────────────────────────────────
class HeroSlideshow {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.slides = $$('.hero-slide', el);
    this.indicators = $$('.hero-indicator', el);
    this.prevBtn = $('.hero-arrow-prev', el);
    this.nextBtn = $('.hero-arrow-next', el);
    this.pauseBtn = $('.hero-pause', el);
    this.current = 0;
    this.paused = false;
    this.timer = null;
    this.DURATION = 5000;
    this.init();
  }

  init() {
    if (!this.slides.length) return;
    this.goTo(0);

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.pauseBtn) this.pauseBtn.addEventListener('click', () => this.togglePause());

    this.indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => this.goTo(i));
    });
  }

  goTo(index) {
    const prev = this.current;
    this.current = (index + this.slides.length) % this.slides.length;

    this.slides.forEach((s, i) => s.classList.toggle('active', i === this.current));
    this.indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === this.current);
      const fill = ind.querySelector('.indicator-fill');
      if (fill) fill.style.width = '0%';
    });

    // Restart fill animation on active indicator
    const activeInd = this.indicators[this.current];
    if (activeInd) {
      const fill = activeInd.querySelector('.indicator-fill');
      if (fill) {
        // Force reflow to restart animation
        void fill.offsetWidth;
        if (!this.paused) {
          fill.style.transition = `width ${this.DURATION}ms linear`;
          fill.style.width = '100%';
        }
      }
    }

    this.clearTimer();
    if (!this.paused) this.startTimer();
  }

  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }

  startTimer() {
    this.timer = setTimeout(() => this.next(), this.DURATION);
  }

  clearTimer() {
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
  }

  togglePause() {
    this.paused = !this.paused;
    const btn = this.pauseBtn;
    if (!btn) return;

    const activeInd = this.indicators[this.current];
    const fill = activeInd?.querySelector('.indicator-fill');

    if (this.paused) {
      this.clearTimer();
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.title = 'Resume slideshow';
      if (fill) fill.style.transition = 'none';
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.title = 'Pause slideshow';
      if (fill) {
        const currentWidth = parseFloat(fill.style.width) || 0;
        const remaining = this.DURATION * ((100 - currentWidth) / 100);
        fill.style.transition = `width ${remaining}ms linear`;
        fill.style.width = '100%';
        this.timer = setTimeout(() => this.next(), remaining);
      } else {
        this.startTimer();
      }
    }
  }
}

// ── Mobile Drawer ────────────────────────────────────────────
class MobileDrawer {
  constructor() {
    this.toggle = $('.mobile-menu-toggle');
    this.drawer = $('.mobile-drawer');
    this.close = $('.mobile-drawer-close');
    if (!this.toggle || !this.drawer) return;
    this.init();
  }

  init() {
    this.toggle.addEventListener('click', () => this.open());
    this.close?.addEventListener('click', () => this.hide());
    this.drawer.addEventListener('click', (e) => {
      if (e.target === this.drawer) this.hide();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  open() {
    this.drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.toggle.setAttribute('aria-expanded', 'true');
  }

  hide() {
    this.drawer.classList.remove('open');
    document.body.style.overflow = '';
    this.toggle.setAttribute('aria-expanded', 'false');
  }
}

// ── Accordion ────────────────────────────────────────────────
function initAccordions() {
  $$('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !expanded);
      const body = trigger.nextElementSibling;
      if (body?.classList.contains('accordion-body')) {
        body.classList.toggle('open', !expanded);
      }
    });
  });
}

// ── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  $$('.tab-list').forEach(tabList => {
    const buttons = $$('.tab-btn', tabList);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const container = tabList.closest('.tabs-container') || tabList.parentElement;

        $$('.tab-btn', tabList).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        $$('.tab-panel', container).forEach(p => p.classList.remove('active'));
        const panel = $(`[data-panel="${target}"]`, container);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ── Search Filter ─────────────────────────────────────────────
function initSearchFilter(inputSel, itemSel, nameSel) {
  const input = $(inputSel);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    $$(itemSel).forEach(item => {
      const name = $(nameSel, item)?.textContent?.toLowerCase() || '';
      item.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
  });
}

// ── Filter Buttons ────────────────────────────────────────────
function initFilterBtns(containerSel, itemSel, attr) {
  const container = $(containerSel);
  if (!container) return;
  $$('.filter-btn', container).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn', container).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.filter;
      $$(itemSel).forEach(item => {
        item.style.display = (!val || val === 'all' || item.dataset[attr] === val) ? '' : 'none';
      });
    });
  });
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(title, message, duration = 3500) {
  let toast = $('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<strong>${title}</strong>${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Smooth Page Transitions ───────────────────────────────────
function initPageLinks() {
  $$('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') &&
        !href.startsWith('mailto') && !link.hasAttribute('target')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 200ms ease';
        setTimeout(() => { window.location.href = href; }, 200);
      });
    }
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Fade in
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 300ms ease';
    document.body.style.opacity = '1';
  });

  new HeroSlideshow($('.hero-section'));
  new MobileDrawer();
  initAccordions();
  initTabs();
  initPageLinks();
});