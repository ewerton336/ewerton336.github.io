/**
 * Main JavaScript
 * Handles scroll animations, typing effect, form validation, and interactions
 */

class PortfolioInteractions {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section");
    this.typingElement = document.getElementById("typing-text");
    this.contactForm = document.getElementById("contact-form");

    this.typingTexts = [
      "Desenvolvedor .NET",
      "Full Stack Developer",
      "Programador C#",
      "React & Angular",
      "Criador de Soluções",
    ];
    this.typingIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupNavbar();
    this.setupTypingEffect();
    this.setupFormValidation();
    this.setup3DCardEffects();
    this.setupSmoothScroll();
  }

  // Scroll Animations with Intersection Observer
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observer.observe(el));

    // Also observe sections for nav highlighting
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.highlightNavLink(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    this.sections.forEach((section) => sectionObserver.observe(section));
  }

  // Navbar scroll effect
  setupNavbar() {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class when scrolling down
      if (currentScroll > 100) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });
  }

  // Highlight active nav link based on section
  highlightNavLink(sectionId) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for navigation links
  setupSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Typing effect for hero section
  setupTypingEffect() {
    if (!this.typingElement) return;

    this.typeText();
  }

  typeText() {
    const currentText = this.typingTexts[this.typingIndex];

    if (this.isDeleting) {
      // Delete character
      this.typingElement.textContent = currentText.substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length;
        setTimeout(() => this.typeText(), 500);
        return;
      }
    } else {
      // Add character
      this.typingElement.textContent = currentText.substring(
        0,
        this.charIndex + 1
      );
      this.charIndex++;

      if (this.charIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.typeText(), 2000);
        return;
      }
    }

    const typingSpeed = this.isDeleting ? 50 : 100;
    setTimeout(() => this.typeText(), typingSpeed);
  }

  // 3D Card hover effect
  setup3DCardEffects() {
    const cards = document.querySelectorAll(
      ".project-card, .skill-category, .stat-item"
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Form validation and submission
  setupFormValidation() {
    if (!this.contactForm) return;

    this.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Validate email
      if (!this.validateEmail(formData.email)) {
        this.showFormMessage("Por favor, insira um email válido.", "error");
        return;
      }

      // Validate other fields
      if (!formData.name || !formData.subject || !formData.message) {
        this.showFormMessage("Por favor, preencha todos os campos.", "error");
        return;
      }

      // Create mailto link (since we can't send emails from static site)
      const mailtoLink = `mailto:ewertonguimaraes2@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      this.showFormMessage("Abrindo seu cliente de email...", "success");

      // Reset form
      setTimeout(() => {
        this.contactForm.reset();
      }, 2000);
    });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement("div");
    messageEl.className = `form-message ${type}`;
    messageEl.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            text-align: center;
            background: ${
              type === "success"
                ? "rgba(16, 255, 0, 0.1)"
                : "rgba(255, 0, 0, 0.1)"
            };
            color: ${type === "success" ? "var(--green-neon)" : "#ff4444"};
            border: 1px solid ${
              type === "success" ? "var(--green-neon)" : "#ff4444"
            };
            animation: slideDown 0.3s ease;
        `;
    messageEl.textContent = message;

    // Add to form
    this.contactForm.appendChild(messageEl);

    // Remove after 5 seconds
    setTimeout(() => {
      messageEl.style.animation = "slideUp 0.3s ease";
      setTimeout(() => messageEl.remove(), 300);
    }, 5000);
  }
}

// Add animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize interactions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioInteractions();
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
