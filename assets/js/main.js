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
  var fans = [].slice.call(document.querySelectorAll('.fan[data-speed]')), tick = false;
  function run() {
    var vh = innerHeight;
    fans.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var d = (r.top + r.height / 2 - vh / 2) * Number(f.dataset.speed);
      f.style.transform = 'translate3d(0,' + (-d).toFixed(1) + 'px,0)';
    });
    tick = false;
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
  run();
})();
