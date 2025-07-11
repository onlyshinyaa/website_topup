// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeFormHandlers();
    initializeParticleEffect();
});

// Initialize animations
function initializeAnimations() {
    // Add loading animation to elements
    const elements = document.querySelectorAll('.card, .feature-card, .promo-card');
    elements.forEach((element, index) => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('d-none');
            } else {
                backToTopButton.classList.add('d-none');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Game selection with enhanced feedback
    const gameButtons = document.querySelectorAll('[onclick*="selectGame"]');
    gameButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social media links animation
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// Initialize form handlers
function initializeFormHandlers() {
    // Smooth scrolling for anchor links
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

    // Form validation and submission (if form exists)
    const topupForm = document.getElementById('topupForm');
    if (topupForm) {
        topupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gameSelect = document.getElementById('gameSelect').value;
            const userId = document.getElementById('userId').value;
            const serverId = document.getElementById('serverId').value;
            const nominal = document.getElementById('nominal').value;
            
            // Enhanced validation
            if (!gameSelect || !userId || !serverId || !nominal) {
                showNotification('Mohon lengkapi semua data yang diperlukan!', 'error');
                return;
            }
            
            if (!/^\d+$/.test(userId)) {
                showNotification('User ID harus berupa angka!', 'error');
                return;
            }
            
            if (!/^\d+$/.test(serverId)) {
                showNotification('Server ID harus berupa angka!', 'error');
                return;
            }
            
            // Show loading state
            showNotification('Memproses top up...', 'info');
            
            // Simulate processing
            setTimeout(() => {
                showNotification(`Top Up Berhasil!\n\nDetail Transaksi:\nGame: ${gameSelect}\nUser ID: ${userId}\nServer ID: ${serverId}\nNominal: Rp ${parseInt(nominal).toLocaleString('id-ID')}`, 'success');
                topupForm.reset();
            }, 2000);
        });
    }
}

// Initialize particle effect
function initializeParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createParticles(heroSection);
    }
}

// Create particle effect
function createParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 193, 7, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);
    }
}

// Game selection function
function selectGame(gameName) {
    // Add visual feedback
    const button = event.target;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Memproses...';
    button.disabled = true;
    
    setTimeout(() => {
        window.location.href = "Form.html?game=" + encodeURIComponent(gameName);
    }, 500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Add CSS for notifications and particles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        color: white;
        font-weight: 500;
    }
    
    .notification-success { background: linear-gradient(135deg, #28a745, #20c997); }
    .notification-error { background: linear-gradient(135deg, #dc3545, #e74c3c); }
    .notification-warning { background: linear-gradient(135deg, #ffc107, #f39c12); }
    .notification-info { background: linear-gradient(135deg, #17a2b8, #3498db); }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        margin-left: 10px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .particle {
        animation: float 6s linear infinite;
    }
    
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar-scrolled {
        background-color: rgba(33, 37, 41, 0.98) !important;
        backdrop-filter: blur(15px);
    }
`;
document.head.appendChild(style);

// Add loading animation for images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Intersection Observer for lazy loading animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card, .feature-card, .promo-card');
    animateElements.forEach(el => observer.observe(el));
}); 