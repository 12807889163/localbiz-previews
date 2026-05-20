/* Premium Website — Shared JavaScript v2 */
(function() {
  'use strict';

  /* ── Loader ── */
  var loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(function() {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 800);
  }

  /* ── Nav scroll ── */
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Mobile menu ── */
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(fi) {
        fi.classList.remove('open');
        fi.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── Count-up animation ── */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/\D/g,''), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = performance.now();
    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  var countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.count-up').forEach(animateCount);
        countObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  document.querySelectorAll('.stats, .hero-stats').forEach(function(el) {
    countObserver.observe(el);
  });

  /* ── Scroll reveal ── */
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
  document.querySelectorAll('.service-card, .why-card, .process-step, .testimonial-card, .area-chip, .faq-item').forEach(function(el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ── Appointment modal ── */
  var modal = document.getElementById('apt-modal');
  document.querySelectorAll('[data-modal-open]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (modal) modal.classList.add('open');
    });
  });
  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', function() {
      modal.classList.remove('open');
    });
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
      if (e.target === modal) modal.classList.remove('open');
    });
    var aptForm = modal.querySelector('form');
    if (aptForm) {
      aptForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var success = modal.querySelector('.apt-success');
        if (success) {
          aptForm.style.display = 'none';
          success.style.display = 'block';
        }
      });
    }
  }

  /* ── Page transitions ── */
  document.querySelectorAll('a[href$=".html"]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      a.addEventListener('click', function(e) {
        var target = a.href;
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s';
        setTimeout(function() { window.location.href = target; }, 200);
        e.preventDefault();
      });
    }
  });
})();
