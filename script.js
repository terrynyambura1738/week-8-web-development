// Website functionality
class Website {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.initNavigation();
        this.initSlider();
        this.initContactForm();
        this.initMobileMenu();
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
                
                // Show target page
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById(targetPage).classList.add('active');
                
                // Close mobile menu if open
                document.querySelector('.nav-menu').classList.remove('active');
            });
        });

        // CTA button navigation
        document.querySelectorAll('[data-page]').forEach(btn => {
            if (!btn.classList.contains('nav-link')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = btn.getAttribute('data-page');
                    
                    // Update navigation
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    document.querySelector(`[data-page="${targetPage}"].nav-link`).classList.add('active');
                    
                    // Show target page
                    pages.forEach(page => page.classList.remove('active'));
                    document.getElementById(targetPage).classList.add('active');
                });
            }
        });
    }

    initSlider() {
        const prevBtn = document.querySelector('.slider-nav.prev');
        const nextBtn = document.querySelector('.slider-nav.next');
        
        prevBtn.addEventListener('click', () => this.changeSlide(-1));
        nextBtn.addEventListener('click', () => this.changeSlide(1));
        
        // Auto-advance slider
        setInterval(() => this.changeSlide(1), 5000);
    }

    changeSlide(direction) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            this.showError('nameError', 'Full name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            this.showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            this.showError('emailError', 'Email address is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            this.showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but must be valid if provided)
        if (phone.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
                this.showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            this.showError('subjectError', 'Subject is required');
            isValid = false;
        } else if (subject.value.trim().length < 5) {
            this.showError('subjectError', 'Subject must be at least 5 characters');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            this.showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            this.showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        this.clearError(field);
        
        switch(field.id) {
            case 'name':
                if (!field.value.trim()) {
                    this.showError('nameError', 'Full name is required');
                } else if (field.value.trim().length < 2) {
                    this.showError('nameError', 'Name must be at least 2 characters');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!field.value.trim()) {
                    this.showError('emailError', 'Email address is required');
                } else if (!emailRegex.test(field.value)) {
                    this.showError('emailError', 'Please enter a valid email address');
                }
                break;
            case 'phone':
                if (field.value.trim()) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                        this.showError('phoneError', 'Please enter a valid phone number');
                    }
                }
                break;
            case 'subject':
                if (!field.value.trim()) {
                    this.showError('subjectError', 'Subject is required');
                } else if (field.value.trim().length < 5) {
                    this.showError('subjectError', 'Subject must be at least 5 characters');
                }
                break;
            case 'message':
                if (!field.value.trim()) {
                    this.showError('messageError', 'Message is required');
                } else if (field.value.trim().length < 10) {
                    this.showError('messageError', 'Message must be at least 10 characters');
                }
                break;
        }
    }

    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.parentElement.querySelector('input, textarea').style.borderColor = '#dc3545';
    }

    clearError(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        errorElement.textContent = '';
        field.style.borderColor = '#e9ecef';
    }

    submitForm() {
        // Simulate form submission
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            document.getElementById('contactForm').reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Website();
});

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        const rate = scrolled * -0.5;
        if (scrolled > 100) {
            card.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
});