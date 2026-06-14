// Lightweight animations initializer used by Layout
export function initAnimations() {
  // Scroll reveal
  try {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.animate-on-scroll'));
    if (els.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      els.forEach((el) => obs.observe(el));
    }
  } catch (e) {
    // silent
  }

  // Simple counter animation for elements with data-count
  try {
    const counters = Array.from(document.querySelectorAll<HTMLElement>('.stat-number[data-count]'));
    if (counters.length) {
      const counterObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && !el.dataset.animated) {
            el.dataset.animated = 'true';
            const target = parseInt(el.dataset.count || '0', 10) || 0;
            const duration = 1600;
            const start = performance.now();

            function step(now: number) {
              const elapsed = now - start;
              const pct = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - pct, 3);
              const value = Math.floor(eased * target);
              el.textContent = value.toLocaleString();
              if (pct < 1) requestAnimationFrame(step);
              else el.textContent = target.toLocaleString();
            }

            requestAnimationFrame(step);
            counterObs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach((c) => counterObs.observe(c));
    }
  } catch (e) {
    // silent
  }
}

export function initScrollProgress() {
  function updateBar() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', String(pct));
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

export function initAll() {
  initAnimations();
  initScrollProgress();
}
