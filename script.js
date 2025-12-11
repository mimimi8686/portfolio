/**
 * Portfolio Site - JavaScript
 * ===========================
 * Handles animations, navigation, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Navigation.init();
  ScrollAnimations.init();
  SkillBars.init();
  SmoothScroll.init();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and scroll behavior
 */
const Navigation = {
  nav: null,
  toggle: null,
  menu: null,
  links: null,
  lastScrollY: 0,
  
  init() {
    this.nav = document.getElementById('nav');
    this.toggle = document.getElementById('nav-toggle');
    this.menu = document.getElementById('nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    
    if (!this.nav || !this.toggle || !this.menu) return;
    
    this.bindEvents();
    this.updateActiveLink();
  },
  
  bindEvents() {
    // Mobile menu toggle
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking links
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.menu.classList.contains('active')) {
        this.closeMenu();
      }
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveLink();
    }, { passive: true });
  },
  
  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.menu.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  },
  
  closeMenu() {
    this.toggle.classList.remove('active');
    this.menu.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Hide nav on scroll down, show on scroll up (optional feature)
    // Keeping nav always visible for better UX
    
    this.lastScrollY = currentScrollY;
  },
  
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        this.links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
};

/**
 * Scroll Animations Module
 * Uses Intersection Observer for performance
 */
const ScrollAnimations = {
  init() {
    this.observeElements();
  },
  
  observeElements() {
    const animatedElements = document.querySelectorAll(
      '.section-header, .about-content, .skills-category, .work-card, .timeline-item, .contact-content'
    );
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in', 'visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
    
    // Staggered animations for grid items
    this.observeStaggeredElements();
  },
  
  observeStaggeredElements() {
    const grids = document.querySelectorAll('.works-grid, .skills-content');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stagger-children', 'visible');
        }
      });
    }, observerOptions);
    
    grids.forEach(grid => {
      grid.classList.add('stagger-children');
      observer.observe(grid);
    });
  }
};

/**
 * Skill Bars Animation Module
 */
const SkillBars = {
  animated: false,
  
  init() {
    this.observeSkills();
  },
  
  observeSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animateBars();
          this.animated = true;
        }
      });
    }, observerOptions);
    
    observer.observe(skillsSection);
  },
  
  animateBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach((bar, index) => {
      const progress = bar.getAttribute('data-progress');
      
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, index * 100);
    });
  }
};

/**
 * Smooth Scroll Module
 */
const SmoothScroll = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }
};

/**
 * Utility: Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}




