
document.addEventListener('DOMContentLoaded', function() {
  // Typing animation
  const typingText = document.getElementById('typing-text');
  const fullText = "Learning sharp. Thinking smart. Staying curious.";
  const typingSpeed = 50;
  let i = 0;

  function typeWriter() {
    if (i < fullText.length) {
      typingText.innerHTML += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  typeWriter();

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Message sent! (This is a demo - no actual message was sent)');
      contactForm.reset();
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for section detection
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveNavItem(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  function setActiveNavItem(id) {
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${id}`) {
        item.classList.add('active');
      }
    });
  }

  // Animation on scroll
  const animateElements = document.querySelectorAll('.terminal-card, .glass-card, .info-card');
  
  function checkIfInView() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-fade-in');
      }
    });
  }

  window.addEventListener('scroll', checkIfInView);
  checkIfInView();
});
