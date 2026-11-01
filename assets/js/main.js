// Mura Living 案B
(function () {
  var burger = document.querySelector('.burger'), nav = document.getElementById('spnav');
  function toggle(open) { nav.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く'); }
  burger.addEventListener('click', function () { toggle(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) toggle(false); });

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('is-in'); }); }

  // 風の線
  var windSvg = '<svg viewBox="0 0 600 200"><path pathLength="100" d="M0 120C90 120 150 90 230 90s130 40 210 30 100-60 60-90-90 0-70 30"/><path pathLength="100" d="M40 150C140 150 220 130 320 135s170 20 240-10"/><path pathLength="100" d="M0 70C70 72 120 56 190 50s120-6 170 14c34 14 60-6 46-30s-50-16-44 12"/><path pathLength="100" d="M120 178C200 170 300 176 380 168"/></svg>';
  document.querySelectorAll('.wind').forEach(function (w) { w.innerHTML = windSvg; });

  // スクロールの動き
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var plx = [].slice.call(document.querySelectorAll('.plx')), hero = document.querySelector('.fv__img'), tick = false;
  function run() {
    var vh = innerHeight;
    if (hero && scrollY < vh * 1.2) hero.style.setProperty('--py', (scrollY * 0.16).toFixed(1) + 'px');
    plx.forEach(function (im) {
      var r = im.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      im.style.setProperty('--py', (-6 - p * 5).toFixed(2) + '%');
    });
    tick = false;
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
  run();
})();
