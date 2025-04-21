
document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'enabled') {
    htmlElement.classList.add('dark');
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      htmlElement.classList.toggle('dark');
      
      // Save preference to localStorage
      if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

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

  if (typingText) {
    typeWriter();
  }

  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      } else {
        clearError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        clearError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required');
        isValid = false;
      } else {
        clearError(messageInput);
      }
      
      if (isValid) {
        // In a real application, this would be an AJAX request to a Laravel backend
        showNotification('Message sent successfully! (Demo only - no actual message was sent)');
        contactForm.reset();
      }
    });
  }
  
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    input.classList.add('border-red-500');
  }
  
  function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    input.classList.remove('border-red-500');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('opacity-0');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
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
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('block')) {
        mobileMenu.classList.remove('block');
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // GitHub Activity Integration (simulate with placeholder)
  const githubActivity = document.getElementById('github-activity');
  if (githubActivity) {
    fetchGitHubActivity();
  }
  
  function fetchGitHubActivity() {
    // In a real application, this would be an AJAX request to GitHub API
    // For demo purposes, we'll use placeholder data
    const activityItems = [
      { repo: 'security-toolkit', action: 'Pushed 3 commits', time: '2 days ago' },
      { repo: 'ctf-writeups', action: 'Created new branch', time: '5 days ago' },
      { repo: 'web-pentest-lab', action: 'Merged pull request', time: '1 week ago' },
      { repo: 'cloud-security-demos', action: 'Opened issue', time: '2 weeks ago' }
    ];
    
    const activityList = document.getElementById('github-activity-list');
    if (activityList) {
      activityItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'border-b border-gray-200 dark:border-gray-700 py-3';
        listItem.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <span class="font-medium">${item.repo}</span>
              <p class="text-sm text-gray-600 dark:text-gray-400">${item.action}</p>
            </div>
            <span class="text-xs text-gray-500">${item.time}</span>
          </div>
        `;
        activityList.appendChild(listItem);
      });
    }
  }

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
  const animateElements = document.querySelectorAll('.card, .skill-card, .certification-card, .achievement-card');
  
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
  
  // Handle resume PDF download
  const downloadResumeButton = document.getElementById('download-resume');
  if (downloadResumeButton) {
    downloadResumeButton.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real application, this would be a link to an actual PDF
      alert('In a real application, this would download the resume PDF');
    });
  }
});
