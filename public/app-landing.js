// Powers the per-app landing page download cluster.
// Each landing page has <div class="app-download" data-repo="owner/name"></div>
// Detects the visitor's OS, looks up public/releases.json, and renders
// a primary "Download for <OS>" button + alt platform pills.
(function () {
  const ICONS = {
    win: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.5l9.9-1.4v9.6H0zm11.1-1.5L24 0v11.7H11.1zM0 12.6h9.9v9.6L0 20.8zm11.1-.3H24V24l-12.9-1.8z"/></svg>',
    mac: '<svg viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-0.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.8-82-106.9-209.6-106.9-331.5 0-194.8 126.6-298.3 251.3-298.3 66.2 0 121.3 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-0.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2 0.6 8.4 1.3 13.6 1.3 45.4 0 103.7-30.4 135.5-71.3z"/></svg>',
    linux: '<svg viewBox="0 0 448 512" fill="currentColor"><path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/></svg>'
  };
  const LABELS = { win: 'Windows', mac: 'macOS', linux: 'Linux' };

  function detectPlatform() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const p = (navigator.platform || '').toLowerCase();
    if (p.includes('mac') || ua.includes('mac os')) return 'mac';
    if (p.includes('win') || ua.includes('windows')) return 'win';
    if (p.includes('linux') || ua.includes('linux') || ua.includes('x11')) return 'linux';
    return 'win';
  }

  function render(container, release) {
    const detected = detectPlatform();
    const order = [detected, ...['win', 'mac', 'linux'].filter(p => p !== detected)];
    const primary = release[detected] ? detected : order.find(p => release[p]);
    if (!primary) {
      container.innerHTML = '<div class="dl-meta">No downloads available yet — check the <a href="https://github.com/' + container.dataset.repo + '/releases">releases page</a>.</div>';
      return;
    }
    let html = '<a class="dl-primary" href="' + release[primary] + '">' + ICONS[primary] + '<span>Download for ' + LABELS[primary] + '</span></a>';
    html += '<div class="dl-alts">';
    for (const p of ['win', 'mac', 'linux']) {
      if (!release[p]) continue;
      html += '<a class="dl-pill" href="' + release[p] + '" title="Download for ' + LABELS[p] + '">' + ICONS[p] + '<span>' + LABELS[p] + '</span></a>';
    }
    html += '</div>';
    html += '<div class="dl-meta">Free &amp; open source · <a href="https://github.com/' + container.dataset.repo + '/releases">All releases</a></div>';
    container.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.app-download[data-repo]');
    if (!containers.length) return;
    fetch('/releases.json')
      .then(r => r.ok ? r.json() : {})
      .then(releases => {
        containers.forEach(c => {
          const r = releases[c.dataset.repo];
          if (r) render(c, r);
          else c.innerHTML = '<div class="dl-meta">No downloads available yet — check the <a href="https://github.com/' + c.dataset.repo + '/releases">releases page</a>.</div>';
        });
      })
      .catch(() => {
        containers.forEach(c => {
          c.innerHTML = '<div class="dl-meta">Could not load releases — visit the <a href="https://github.com/' + c.dataset.repo + '/releases">releases page</a>.</div>';
        });
      });
  });
})();
