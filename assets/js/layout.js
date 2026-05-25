/* ============================================================
   OMENFALL — SHARED LAYOUT (Header + Footer injection)
   ============================================================ */

'use strict';

// Determine the root path based on depth
function getRootPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // pages/ subdirectory = 2 levels, root = 0 or 1
  if (window.location.pathname.includes('/pages/')) {
    return '../../';
  }
  return './';
}

function buildHeader(root) {
  const navItems = [
    {
      label: 'Collections',
      links: [
        { label: 'My Characters',         href: `${root}pages/collections/characters.html` },
        { label: 'My Campaigns',          href: `${root}pages/collections/campaigns.html` },
        { label: 'My Encounters',         href: `${root}pages/collections/encounters.html` },
        { label: 'My Homebrew Collection',href: `${root}pages/collections/homebrew-collection.html` },
        { label: 'My Homebrew Creations', href: `${root}pages/collections/homebrew-creations.html` },
      ]
    },
    {
      label: 'Game Rules',
      links: [
        { label: 'Classes',       href: `${root}pages/game-rules/classes.html` },
        { label: 'Backgrounds',   href: `${root}pages/game-rules/backgrounds.html` },
        { label: 'Species',       href: `${root}pages/game-rules/species.html` },
        { label: 'Feats',         href: `${root}pages/game-rules/feats.html` },
        { label: 'Spells',        href: `${root}pages/game-rules/spells.html` },
        { label: 'Equipment',     href: `${root}pages/game-rules/equipment.html` },
        { label: 'Magic Items',   href: `${root}pages/game-rules/magic-items.html` },
        { label: 'Monsters',      href: `${root}pages/game-rules/monsters.html` },
      ]
    },
    {
      label: 'Sources',
      links: [
        { label: "Player's Handbook",    href: `${root}pages/sources/players-handbook.html` },
        { label: "Dungeon Master's Guide",href: `${root}pages/sources/dungeon-masters-guide.html` },
        { label: 'Monster Manual',        href: `${root}pages/sources/monster-manual.html` },
      ]
    },
    {
      label: 'Tools',
      links: [
        { label: 'Character Builder', href: `${root}pages/tools/character-builder.html` },
        { label: 'VTT',               href: `${root}pages/tools/vtt.html` },
        { label: 'Mobile App',        href: `${root}pages/tools/mobile-app.html` },
        { label: 'Encounters',        href: `${root}pages/tools/encounters.html` },
        { label: 'Discord Bot',       href: `${root}pages/tools/discord-bot.html` },
      ]
    },
    {
      label: 'Media',
      links: [
        { label: 'Branding',   href: `${root}pages/media/branding.html` },
        { label: 'Twitch',     href: 'https://twitch.tv', external: true },
        { label: 'YouTube',    href: 'https://youtube.com', external: true },
        { label: 'Patreon',    href: 'https://patreon.com', external: true },
        { label: 'Changelog',  href: `${root}pages/media/changelog.html` },
      ]
    },
    { label: 'Learn to Play', href: `${root}pages/learn-to-play.html`, solo: true },
    { label: 'Marketplace',   href: `${root}pages/marketplace/index.html`, solo: true },
  ];

  const dropdownHTML = (item) => item.links.map(l => `
    <a class="dropdown-link" href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}>
      <span class="dot"></span>${l.label}
    </a>`).join('');

  const navHTML = navItems.map(item => {
    if (item.solo) {
      return `<li class="nav-item">
        <a class="nav-link" href="${item.href}">${item.label}</a>
      </li>`;
    }
    return `<li class="nav-item">
      <button class="nav-link" aria-haspopup="true" aria-expanded="false">
        ${item.label}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="nav-dropdown">
        <div class="dropdown-group">${dropdownHTML(item)}</div>
      </div>
    </li>`;
  }).join('');

  const mobileNavHTML = navItems.map(item => {
    const links = item.solo
      ? `<a class="mobile-nav-link" href="${item.href}">${item.label}</a>`
      : item.links.map(l => `<a class="mobile-nav-link" href="${l.href}">${l.label}</a>`).join('');
    return `<div class="mobile-nav-section">
      <div class="mobile-nav-title">${item.solo ? '' : item.label}</div>
      ${links}
    </div>`;
  }).join('');

  return `
  <header class="site-header" id="site-header">
    <!-- Topbar -->
    <div class="topbar">
      <div class="content-wrap">
        <div class="topbar-inner">
          <a href="${root}index.html" class="site-logo">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span class="logo-wordmark">OMEN<span>FALL</span></span>
          </a>

          <div class="topbar-search">
            <div class="search-input-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="search" class="search-input" placeholder="Search Omenfall..." aria-label="Search">
            </div>
          </div>

          <div class="topbar-auth">
            <a href="${root}pages/auth/signin.html" class="btn btn-ghost btn-sm">Sign In</a>
            <a href="${root}pages/auth/signup.html" class="btn btn-primary btn-sm">Sign Up</a>
          </div>

          <button class="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <nav class="main-nav" aria-label="Main navigation">
      <div class="content-wrap">
        <ul class="nav-inner">${navHTML}</ul>
      </div>
    </nav>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-drawer" role="dialog" aria-label="Navigation menu">
    <div class="mobile-drawer-header">
      <a href="${root}index.html" class="site-logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <span class="logo-wordmark">OMEN<span>FALL</span></span>
      </a>
      <button class="mobile-drawer-close" aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    ${mobileNavHTML}
    <div class="mobile-auth">
      <a href="${root}pages/auth/signin.html" class="btn btn-secondary" style="justify-content:center">Sign In</a>
      <a href="${root}pages/auth/signup.html" class="btn btn-primary" style="justify-content:center">Sign Up</a>
    </div>
  </div>`;
}

function buildFooter(root) {
  return `
  <footer class="site-footer">
    <div class="content-wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${root}index.html" class="site-logo">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span class="logo-wordmark">OMEN<span>FALL</span></span>
          </a>
          <p class="footer-tagline">Your gateway to the world of Omenfall. Build characters, run campaigns, and explore a rich fantasy world with friends.</p>
          <div class="social-links">
            <a href="https://x.com" target="_blank" rel="noopener" class="social-link" aria-label="X / Twitter" title="X">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link" aria-label="Instagram" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="social-link" aria-label="YouTube" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener" class="social-link" aria-label="Twitch" title="Twitch">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener" class="social-link" aria-label="Discord" title="Discord">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" aria-label="Facebook" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">Game Rules</div>
          <div class="footer-col-links">
            <a href="${root}pages/game-rules/classes.html" class="footer-col-link">Classes</a>
            <a href="${root}pages/game-rules/species.html" class="footer-col-link">Species</a>
            <a href="${root}pages/game-rules/backgrounds.html" class="footer-col-link">Backgrounds</a>
            <a href="${root}pages/game-rules/feats.html" class="footer-col-link">Feats</a>
            <a href="${root}pages/game-rules/spells.html" class="footer-col-link">Spells</a>
            <a href="${root}pages/game-rules/equipment.html" class="footer-col-link">Equipment</a>
            <a href="${root}pages/game-rules/magic-items.html" class="footer-col-link">Magic Items</a>
            <a href="${root}pages/game-rules/monsters.html" class="footer-col-link">Monsters</a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">Sources</div>
          <div class="footer-col-links">
            <a href="${root}pages/sources/players-handbook.html" class="footer-col-link">Player's Handbook</a>
            <a href="${root}pages/sources/dungeon-masters-guide.html" class="footer-col-link">Dungeon Master's Guide</a>
            <a href="${root}pages/sources/monster-manual.html" class="footer-col-link">Monster Manual</a>
          </div>
          <div class="footer-col-title" style="margin-top:24px">Tools</div>
          <div class="footer-col-links">
            <a href="${root}pages/tools/character-builder.html" class="footer-col-link">Character Builder</a>
            <a href="${root}pages/tools/vtt.html" class="footer-col-link">VTT</a>
            <a href="${root}pages/tools/mobile-app.html" class="footer-col-link">Mobile App</a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">Community</div>
          <div class="footer-col-links">
            <a href="https://discord.com" target="_blank" rel="noopener" class="footer-col-link">Discord</a>
            <a href="https://twitch.tv" target="_blank" rel="noopener" class="footer-col-link">Twitch</a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="footer-col-link">YouTube</a>
            <a href="https://patreon.com" target="_blank" rel="noopener" class="footer-col-link">Patreon</a>
            <a href="${root}pages/media/changelog.html" class="footer-col-link">Changelog</a>
          </div>
        </div>

        <div class="footer-col">
          <div class="footer-col-title">Company</div>
          <div class="footer-col-links">
            <a href="${root}pages/about.html" class="footer-col-link">About</a>
            <a href="${root}pages/marketplace/index.html" class="footer-col-link">Marketplace</a>
            <a href="${root}pages/learn-to-play.html" class="footer-col-link">Learn to Play</a>
            <a href="${root}pages/media/branding.html" class="footer-col-link">Branding</a>
            <a href="${root}pages/privacy.html" class="footer-col-link">Privacy Policy</a>
            <a href="${root}pages/terms.html" class="footer-col-link">Terms of Service</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-bottom-text">&copy; ${new Date().getFullYear()} Omenfall. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="${root}pages/privacy.html" class="footer-bottom-link">Privacy</a>
          <a href="${root}pages/terms.html" class="footer-bottom-link">Terms</a>
          <a href="${root}pages/media/branding.html" class="footer-bottom-link">Branding</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// Inject into page
(function() {
  const root = getRootPath();

  const headerEl = document.getElementById('header-placeholder');
  if (headerEl) headerEl.outerHTML = buildHeader(root);

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = buildFooter(root);
})();