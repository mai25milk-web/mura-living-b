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

  // 扇形のモチーフをスクロールに合わせてゆっくり動かす
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var fans = [].slice.call(document.querySelectorAll('.fan[data-speed]')), plx = [].slice.call(document.querySelectorAll('.plx')), hero = document.querySelector('.fv__img'), tick = false;
  function run() {
    var vh = innerHeight;
    fans.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var d = (r.top + r.height / 2 - vh / 2) * Number(f.dataset.speed);
      f.style.transform = 'translate3d(0,' + (-d).toFixed(1) + 'px,0)';
    });
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
