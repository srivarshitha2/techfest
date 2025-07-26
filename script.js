// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Register Button Click Handler
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Show registration message
            showNotification('Registration form will be available soon!', 'info');
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');

        // Real-time validation
        nameInput?.addEventListener('blur', () => validateField(nameInput, 'nameError', 'Name is required'));
        emailInput?.addEventListener('blur', () => validateEmail(emailInput, 'emailError'));
        subjectInput?.addEventListener('blur', () => validateField(subjectInput, 'subjectError', 'Subject is required'));
        messageInput?.addEventListener('blur', () => validateField(messageInput, 'messageError', 'Message is required'));

        // Form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate all fields
            const isNameValid = validateField(nameInput, 'nameError', 'Name is required');
            const isEmailValid = validateEmail(emailInput, 'emailError');
            const isSubjectValid = validateField(subjectInput, 'subjectError', 'Subject is required');
            const isMessageValid = validateField(messageInput, 'messageError', 'Message is required');

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Simulate form submission
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                setTimeout(() => {
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    clearAllErrors();
                }, 2000);
            } else {
                showNotification('Please fix the errors above', 'error');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Counter animation for homepage stats
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                let count = +counter.innerText;
                const increment = Math.ceil(target / 100);
                if (count < target) {
                    counter.innerText = Math.min(count + increment, target);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
});

// === User Registration ===
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.username === username || u.email === email)) {
                showNotification('User already exists!', 'error');
                return;
            }
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            showNotification('Registration successful! You can now login.', 'success');
            registerForm.reset();
        });
    }

    // === User Login ===
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const loginUser = document.getElementById('loginUser').value.trim();
            const loginPassword = document.getElementById('loginPassword').value;
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => (u.username === loginUser || u.email === loginUser) && u.password === loginPassword);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                showNotification('Login successful!', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } else {
                showNotification('Invalid credentials!', 'error');
            }
        });
    }

    // === Admin Registration ===
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    if (adminRegisterForm) {
        adminRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('adminUsername').value.trim();
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;
            let admins = JSON.parse(localStorage.getItem('admins') || '[]');
            if (admins.find(a => a.username === username || a.email === email)) {
                showNotification('Admin already exists!', 'error');
                return;
            }
            admins.push({ username, email, password });
            localStorage.setItem('admins', JSON.stringify(admins));
            showNotification('Admin registration successful! You can now login.', 'success');
            adminRegisterForm.reset();
        });
    }

    // === Admin Login ===
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const loginUser = document.getElementById('adminLoginUser').value.trim();
            const loginPassword = document.getElementById('adminLoginPassword').value;
            let admins = JSON.parse(localStorage.getItem('admins') || '[]');
            const admin = admins.find(a => (a.username === loginUser || a.email === loginUser) && a.password === loginPassword);
            if (admin) {
                localStorage.setItem('loggedInAdmin', JSON.stringify(admin));
                showNotification('Admin login successful!', 'success');
                setTimeout(() => { window.location.href = 'admin.html'; }, 1000);
            } else {
                showNotification('Invalid admin credentials!', 'error');
            }
        });
    }

    // === Admin Dashboard ===
    if (window.location.pathname.endsWith('admin.html')) {
        // Check if admin is logged in
        const loggedInAdmin = localStorage.getItem('loggedInAdmin');
        if (!loggedInAdmin) {
            window.location.href = 'admin_login.html';
        }
        // Show user count and list
        const userCount = document.getElementById('userCount');
        const userList = document.getElementById('userList');
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (userCount) userCount.textContent = users.length;
        if (userList) {
            userList.innerHTML = '';
            users.forEach((u, i) => {
                const li = document.createElement('li');
                li.textContent = `${i+1}. ${u.username} (${u.email})`;
                userList.appendChild(li);
            });
        }
        // Logout button
        const adminLogoutBtn = document.getElementById('adminLogoutBtn');
        if (adminLogoutBtn) {
            adminLogoutBtn.addEventListener('click', function() {
                localStorage.removeItem('loggedInAdmin');
                window.location.href = 'admin_login.html';
            });
        }
    }
});

// Form Validation Functions
function validateField(input, errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);
    
    if (!input.value.trim()) {
        showError(input, errorElement, errorMessage);
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function validateEmail(input, errorId) {
    const errorElement = document.getElementById(errorId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input.value.trim()) {
        showError(input, errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(input.value)) {
        showError(input, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        hideError(input, errorElement);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#007bff';
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        opacity: 0.7;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .about-card, .team-member, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    if (!event.target.closest('.dropdown')) {
        dropdowns.forEach(dd => dd.style.display = 'none');
    } else {
        dropdowns.forEach(dd => dd.style.display = '');
    }
});