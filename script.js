/**
 * GANGADHAR BEHERA — PORTFOLIO CORE JAVASCRIPT
 * Handles Preloader, Interactive Canvas Network, Dynamic Typing,
 * Scroll Reveal, Mobile Navigation, Active Section Highlighting, and Email Copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. PRELOADER DISMISSAL
     ========================================================================== */
  const loader = document.getElementById('loader');

  function dismissLoader() {
    if (!loader || loader.classList.contains('loaded')) return;
    loader.classList.add('loaded');
    setTimeout(() => {
      loader.style.display = 'none';
      // Trigger reveal for any elements already in view
      triggerInitialReveals();
    }, 600);
  }

  // Check if document is already complete, or listen for load event
  if (document.readyState === 'complete') {
    setTimeout(dismissLoader, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismissLoader, 600);
    });
  }

  // Safety fallback: Ensure loader is dismissed within 1.5s regardless of external assets
  setTimeout(dismissLoader, 1500);


  /* ==========================================================================
     2. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  function triggerInitialReveals() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.92) {
        el.classList.add('show');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    triggerInitialReveals();
    window.addEventListener('scroll', triggerInitialReveals, { passive: true });
  }


  /* ==========================================================================
     3. DYNAMIC TYPEWRITER EFFECT
     ========================================================================== */
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const phrases = [
      'AI & Computer Vision Models',
      'Intelligent IoT Architectures',
      'Embedded Telemetry Systems',
      'Full-Stack Web Applications',
      'Real-Time Connected Devices',
      'Autonomous Robotics Prototypes'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at full text
        isDeleting = true;
        typingSpeed = 1900;
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }


  /* ==========================================================================
     4. AMBIENT INTERACTIVE PARTICLE NETWORK CANVAS
     ========================================================================== */
  const canvas = document.getElementById('network');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 35 : 75;
    const maxDistance = isMobile ? 95 : 135;

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.6 + 1;
        // Alternate between neon mint (#7cf6c6) and electric cyan (#6fc9ff)
        this.color = Math.random() > 0.4 ? 'rgba(124, 246, 198,' : 'rgba(111, 201, 255,';
        this.baseAlpha = Math.random() * 0.45 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from boundaries smoothly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction: slight repulse/drift
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.baseAlpha})`;
        ctx.shadowColor = 'rgba(124, 246, 198, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 246, 198, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(111, 201, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }


  /* ==========================================================================
     5. CURSOR GLOW EFFECT
     ========================================================================== */
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderGlow() {
      // Smooth lerp trailing
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(renderGlow);
    }

    renderGlow();
  }


  /* ==========================================================================
     6. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any navigation link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==========================================================================
     7. ACTIVE SECTION HIGHLIGHT ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const offset = 140;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* ==========================================================================
     8. ONE-CLICK EMAIL CLIPBOARD COPY
     ========================================================================== */
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    const email = 'gangadharbehera1380@gmail.com';
    const originalContent = copyBtn.innerHTML;

    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback method
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        copyBtn.innerHTML = '<span>✓</span> Copied to Clipboard!';
        copyBtn.style.borderColor = 'var(--accent)';
        copyBtn.style.color = 'var(--accent)';
        copyBtn.style.background = 'rgba(124, 246, 198, 0.12)';

        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
          copyBtn.style.background = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }
});
