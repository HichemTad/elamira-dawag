(function() {
  // Hamburger menu
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileOverlay = document.getElementById('mobile-menu-overlay');
  var mobileCloseBtn = document.getElementById('mobile-menu-close');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

  // Close mobile menu when a nav item is clicked
  document.querySelectorAll('.mobile-nav-links button').forEach(function(btn) {
    btn.addEventListener('click', closeMobileMenu);
  });

  // Nav scroll behavior
  var nav = document.querySelector('nav');

  function updateNav() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  function showPage(id) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.nav-links button').forEach(function(b) { b.classList.remove('active'); });
    var target = document.getElementById('page-' + id);
    if (target) target.classList.add('active');
    var navBtn = document.getElementById('nav-' + id);
    if (navBtn) navBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.instgrm) window.instgrm.Embeds.process();
  }

  // Attach all navigation via event delegation
  document.addEventListener('click', function(e) {
    var el = e.target;
    // Walk up to find data-page element
    while (el && el !== document) {
      if (el.getAttribute && el.getAttribute('data-page')) {
        e.preventDefault();
        showPage(el.getAttribute('data-page'));
        return;
      }
      el = el.parentNode;
    }
    // Submit button handled by form submit event below
  });

  // Hover effects for cta-contact buttons
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('cta-contact')) {
      var bg = e.target.style.background;
      e.target.setAttribute('data-bg', bg);
      if (bg.indexOf('burgundy') > -1 || bg.indexOf('8B1A1A') > -1 || bg.indexOf('dawag') > -1) {
        e.target.style.background = '#6B1212';
      } else {
        e.target.style.background = '#C50018';
      }
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('cta-contact')) {
      var orig = e.target.getAttribute('data-bg');
      if (orig) e.target.style.background = orig;
    }
  });

  // Carousel
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.carousel-dot');
  var currentSlide = 0;
  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if (slides.length > 1) {
    var prevBtn = document.querySelector('.carousel-prev');
    var nextBtn = document.querySelector('.carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', function() { goToSlide(currentSlide - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goToSlide(currentSlide + 1); });
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goToSlide(i); });
    });

    // Touch/swipe support
    var carousel = document.querySelector('.hero-carousel');
    var touchStartX = 0;
    if (carousel) {
      carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      carousel.addEventListener('touchend', function(e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        }
      }, { passive: true });
    }
  }

  // Scroll animation
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.value-item, .product-card, .spec-item, .brand-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
