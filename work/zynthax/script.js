// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const getStartedBtn = document.getElementById('getStartedBtn');
const getStartedModal = document.getElementById('getStartedModal');
const closeModal = document.querySelector('.close-modal');
const serviceOptions = document.querySelectorAll('.service-option');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const learnMoreModal = document.getElementById('learnMoreModal');
const closeLearnMoreModal = document.getElementById('closeLearnMoreModal');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Modal Functionality
if (getStartedBtn && getStartedModal) {
    // Open modal
    getStartedBtn.addEventListener('click', () => {
        getStartedModal.style.display = 'block';
        // Don't disable body scrolling - allow modal content to scroll
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        getStartedModal.style.display = 'none';
    });

    // Close modal when clicking outside
    getStartedModal.addEventListener('click', (e) => {
        if (e.target === getStartedModal) {
            getStartedModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && getStartedModal.style.display === 'block') {
            getStartedModal.style.display = 'none';
        }
    });

    // Service option click handlers
    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            const service = option.getAttribute('data-service');
            let targetPage = '';
            
            switch(service) {
                case 'e-learning':
                    targetPage = 'e-learning.html';
                    break;
                case 'app-development':
                    targetPage = 'app-development.html';
                    break;
                case 'website-development':
                    targetPage = 'website-development.html';
                    break;
            }
            
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });
}

// Learn More Modal Functionality
if (learnMoreBtn && learnMoreModal) {
    // Open Learn More modal
    learnMoreBtn.addEventListener('click', () => {
        learnMoreModal.style.display = 'block';
    });

    // Close Learn More modal
    closeLearnMoreModal.addEventListener('click', () => {
        learnMoreModal.style.display = 'none';
    });

    // Close Learn More modal when clicking outside
    learnMoreModal.addEventListener('click', (e) => {
        if (e.target === learnMoreModal) {
            learnMoreModal.style.display = 'none';
        }
    });
}

// Company Type Selection Handler for Website Development
function handleCompanyTypeSelection() {
    const companyTypeSelect = document.getElementById('companyType');
    const companyNameGroup = document.getElementById('companyNameGroup');
    const otherTypeGroup = document.getElementById('otherTypeGroup');
    
    if (companyTypeSelect) {
        companyTypeSelect.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            
            // Hide both groups first
            if (companyNameGroup) companyNameGroup.style.display = 'none';
            if (otherTypeGroup) otherTypeGroup.style.display = 'none';
            
            // Show appropriate group based on selection
            if (selectedValue === 'other') {
                if (otherTypeGroup) otherTypeGroup.style.display = 'block';
            } else if (selectedValue && selectedValue !== '') {
                if (companyNameGroup) companyNameGroup.style.display = 'block';
            }
        });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animations for child elements
            const animatedElements = entry.target.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Floating elements animation enhancement
const floatingElements = document.querySelectorAll('.element');
floatingElements.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.2) rotate(180deg)';
        element.style.transition = 'all 0.3s ease';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Service cards hover effect enhancement and click functionality
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Add click functionality to service cards
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        let targetPage = '';
        
        switch(service) {
            case 'e-learning':
                targetPage = 'e-learning.html';
                break;
            case 'app-development':
                targetPage = 'app-development.html';
                break;
            case 'website-development':
                targetPage = 'website-development.html';
                break;
        }
        
        if (targetPage) {
            window.location.href = targetPage;
        }
    });
});

// Portfolio items interaction
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        overlay.style.transform = 'translateY(100%)';
    });
});

// Contact form submission handling - Clean version
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Create email content
            const emailBody = 'Name: ' + name + '\nEmail: ' + email + '\nSubject: ' + subject + '\n\nMessage:\n' + message;
            
            // Open email client
            const mailtoLink = 'mailto:zynthax13@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
            window.open(mailtoLink);
            
            // Send to desktop app
            sendToDesktopApp({
                serviceType: 'General Contact',
                fullName: name,
                email: email,
                phone: '',
                company: '',
                projectDescription: message,
                additionalNotes: 'Subject: ' + subject,
                subject: subject,
                message: message
            }).then(function(success) {
                if (success) {
                    showNotification('Message submitted successfully! Check your email client and desktop app.', 'success');
                } else {
                    showNotification('Message submitted to email! Desktop app not available.', 'success');
                }
            }).catch(function() {
                showNotification('Message submitted to email! Desktop app connection failed.', 'success');
            });
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Old email and WhatsApp functions removed - now using single submit button

// Function to send data to desktop app webhook - Clean version
function sendToDesktopApp(submissionData) {
    return fetch('http://127.0.0.1:3001/webhook/form-submission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
    }).then(function(response) {
        return response.ok;
    }).catch(function() {
        return false;
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const titleMain = document.querySelector('.title-main');
    if (titleMain) {
        const originalText = titleMain.textContent;
        setTimeout(() => {
            typeWriter(titleMain, originalText, 150);
        }, 1000);
    }
});

// Cursor trail effect
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail
createCursorTrail();

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add loading animation to elements
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    elements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
}

// Initialize loading animations when page loads
window.addEventListener('load', () => {
    setTimeout(addLoadingAnimation, 500);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = currentSection.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let currentSection = sections[0];
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // 60fps

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #000;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Form Handling for Service Pages - Clean version
function handleServiceForm(formId, serviceType) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Create email content
            const subject = 'New ' + serviceType + ' Project Request - ZYNTHAX';
            let body = 'New project request received:\n\n';
            body += 'Service Type: ' + serviceType + '\n';
            body += 'Name: ' + data.fullName + '\n';
            body += 'Email: ' + data.email + '\n';
            body += 'Phone: ' + (data.phone || 'Not provided') + '\n';
            body += 'Company: ' + (data.company || 'Not provided') + '\n\n';
            
            // Add service-specific fields
            if (data.projectDescription) {
                body += 'Project Description:\n' + data.projectDescription + '\n\n';
            }
            
            // Add other relevant fields based on service type
            Object.keys(data).forEach(function(key) {
                if (key !== 'fullName' && key !== 'email' && key !== 'phone' && key !== 'company' && key !== 'projectDescription' && data[key]) {
                    var formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                    body += formattedKey + ': ' + data[key] + '\n';
                }
            });
            
            // Open email client
            const mailtoLink = 'mailto:zynthax13@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.open(mailtoLink);
            
            // Send to desktop app
            var submissionData = {
                serviceType: serviceType,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                company: data.company,
                projectDescription: data.projectDescription,
                additionalNotes: data.additionalNotes
            };
            
            // Add all other data
            Object.keys(data).forEach(function(key) {
                submissionData[key] = data[key];
            });
            
            sendToDesktopApp(submissionData).then(function(success) {
                if (success) {
                    showNotification('Project details submitted successfully! Check your email client and desktop app.', 'success');
                } else {
                    showNotification('Project details submitted to email! Desktop app not available.', 'success');
                }
            }).catch(function() {
                showNotification('Project details submitted to email! Desktop app connection failed.', 'success');
            });
            
            // Reset form
            form.reset();
        });
    }
}

// WhatsApp functions removed - now using single submit button for all forms

// Notification system - Clean version
function showNotification(message, type) {
    type = type || 'info';
    
    // Remove existing notifications
    var existingNotifications = document.querySelectorAll('.notification');
    for (var i = 0; i < existingNotifications.length; i++) {
        existingNotifications[i].remove();
    }
    
    // Create notification element
    var notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<div class="notification-content"><span>' + message + '</span><button class="notification-close">&times;</button></div>';
    
    // Add styles
    var bgColor = type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff';
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: ' + bgColor + '; color: #000; padding: 1rem 1.5rem; border-radius: 10px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); z-index: 10000; max-width: 400px;';
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    var closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service forms
    handleServiceForm('eLearningForm', 'E-Learning Platform');
    handleServiceForm('appDevelopmentForm', 'App Development');
    handleServiceForm('websiteDevelopmentForm', 'Website Development');
    
    // Initialize company type selection
    handleCompanyTypeSelection();
});
