// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
            navToggle.classList.toggle('toggle-active');

            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('toggle-active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks && navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navToggle.classList.remove('toggle-active');

                // Reset hamburger lines
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Observe cards and other elements
document.querySelectorAll('.feature-card, .service-item, .testimonial-card, .pricing-card, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Button Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    // CTA Button Actions
    const ctaButtons = document.querySelectorAll('.btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Handle different button actions
            switch(buttonText) {
                case 'Get Started':
                case 'Pick Your Best Package':
                    scrollToSection('#pricing');
                    break;
                case 'Check Out Our Demo':
                    // In a real implementation, this would open a demo
                    showNotification('Demo coming soon! Contact us for a live demonstration.');
                    break;
                case 'Schedule Free Consultation':
                case 'Schedule a Call':
                    // In a real implementation, this would open a booking calendar
                    showNotification('Consultation booking coming soon! Please contact us directly.');
                    break;
            }
        });
    });
});

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1FA2F1;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Portfolio Item Interactions
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const siteName = this.querySelector('h4').textContent;
        showNotification(`Visit ${siteName} to see our work in action!`);
    });
});

// Pricing Card Interactions
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('featured')
            ? 'scale(1.05) translateY(-10px)'
            : 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('featured')
            ? 'scale(1.05)'
            : '';
    });
});

// Testimonial Carousel (if needed in future)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length > 3) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = 'none';
        });

        for (let i = 0; i < 3; i++) {
            const index = (currentTestimonial + i) % testimonials.length;
            testimonials[index].style.display = 'block';
        }

        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinks && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            navToggle.classList.remove('toggle-active');

            // Reset hamburger lines
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
});

// Performance optimization - Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Header background logic here
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add loading animation
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Enhanced mobile experience
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Improve touch interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Add CSS for mobile navigation
const mobileNavCSS = `
@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 80px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-top: 2rem;
        transition: right 0.3s ease;
        z-index: 999;
    }

    .nav-links.nav-active {
        right: 0;
    }

    .nav-links a {
        font-size: 1.2rem;
        margin: 1rem 0;
        padding: 1rem;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
    }
}
`;

// Inject mobile navigation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavCSS;
document.head.appendChild(styleSheet);