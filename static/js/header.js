(() => {
  const toggle = document.querySelector('.site-theme-switch');
  const syncToggle = () => {
    toggle.setAttribute('aria-checked', String(document.documentElement.dataset.colorMode === 'dark'));
  };

  toggle.addEventListener('click', () => {
    switchTheme();
    syncToggle();
  });
  syncToggle();

  const header = document.querySelector('.site-header');
  const identity = header.querySelector('.site-header-identity');
  let framePending = false;

  const syncHeader = () => {
    const progress = Math.min(Math.max(window.scrollY, 0) / 60, 1);
    document.documentElement.style.setProperty('--site-header-progress', progress);
    document.documentElement.style.setProperty('--site-header-height', `${108 - 60 * progress}px`);
    header.classList.toggle('is-contracting', progress > 0);
    identity.inert = progress >= 0.5;
    framePending = false;
  };

  window.addEventListener('scroll', () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(syncHeader);
    }
  }, { passive: true });
  window.addEventListener('pageshow', syncHeader);
  syncHeader();
})();
