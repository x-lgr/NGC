// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const purchaseButtons = document.querySelectorAll('.purchase-btn');
const demoButtons = document.querySelectorAll('.demo-btn');
const modal = document.getElementById('purchaseModal');
const demoModal = document.getElementById('demoModal');
const closeModal = document.querySelector('.close');
const closeDemoModal = document.querySelector('.demo-close');
const selectedProductDiv = document.getElementById('selectedProduct');
const contactForm = document.querySelector('.contact-form');
const purchaseForm = document.querySelector('.purchase-form');
const demoTitle = document.getElementById('demoTitle');
const demoDescription = document.getElementById('demoDescription');
const demoFeatures = document.getElementById('demoFeatures');
let player;

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Product data
const products = {
    'basic-panel': {
        name: 'NEXT GEN CHEAT BASIC PANEL',
        pricing: [
            { duration: '15 Days', price: '₹300' },
            { duration: '30 Days', price: '₹800' },
            { duration: 'Lifetime', price: '₹2000' }
        ],
        description: 'The safest and most powerful panel in the market – 100% anti-ban, fully secure for your main account!',
        features: [
            'AIMBOT',
            'AIMFOV 180°',
            'AIM SCOPE',
            'AWM SWITCH',
            'M82B SWITCH',
            'PC BYPASS',
            'TEMP CLEANER',
            'NO RECOIL',
            'GLITCH FIRE',
            'CHAMS LOCATION',
            'HIDE FROM SCREEN CAPTURE'
        ]
    },
    'ngs-aimkill-exe': {
        name: 'NGS AIMKILL EXE',
        pricing: [
            { duration: '1 Day', price: '₹200' },
            { duration: '10 Days', price: '₹800' },
            { duration: '30 Days', price: '₹1500' },
            { duration: 'Lifetime', price: '₹4600' }
        ],
        description: 'Advanced EXE-based aimkill system with maximum precision and teleport capabilities for ultimate domination.',
        features: [
            'AIMKILL MAX',
            'AIMKILL 360°',
            'AIMKILL DOWN',
            'AIMFOV 1200°',
            'UP PLAYER',
            'TELE KILL 10M',
            'TELEPORT HACK CS/BR',
            'SHAKE KILL',
            'MEDKIT RUN',
            'SPEED HACK JOYSTICK',
            'CLIMB UP',
            'NO RECOIL',
            'AUTO SWITCH',
            'FAST SWITCH',
            'ESP LINE LOCATION',
            'RANK WORKING'
        ]
    },
    'ngc-aimkill-injector': {
        name: 'NGC AIMKILL INJECTOR',
        pricing: [
            { duration: '1 Day', price: '₹180' },
            { duration: '10 Days', price: '₹750' },
            { duration: '30 Days', price: '₹1500' },
            { duration: 'Lifetime', price: '₹4500' }
        ],
        description: 'APK-based injector with advanced aimkill functions and teleport capabilities for mobile gaming dominance.',
        features: [
            'AIMKILL MAX',
            'AIMKILL 360°',
            'AIMKILL DOWN',
            'AIMFOV 1200°',
            'UP PLAYER',
            'TELE KILL 10M',
            'TELEPORT HACK CS/BR',
            'SHAKE KILL',
            'MEDKIT RUN',
            'SPEED HACK JOYSTICK',
            'CLIMB UP',
            'NO RECOIL',
            'AUTO SWITCH',
            'FAST SWITCH',
            'ESP LINE LOCATION',
            'RANK WORKING'
        ]
    },
    'ngc-aim-silent-exe': {
        name: 'NGC AIM SILENT EXE',
        pricing: [
            { duration: '1 Day', price: '₹150' },
            { duration: '10 Days', price: '₹600' },
            { duration: '30 Days', price: '₹1200' },
            { duration: 'Lifetime', price: '₹4500' }
        ],
        description: 'Advanced silent aim system with ghost hack, freeze kill, and comprehensive ESP features for stealth gameplay.',
        features: [
            'AIM SILENT 360°',
            'AIMBOT INTERNAL (RANGE/HEX)',
            'AIM SILENT LITE',
            'AIMFOV 999°',
            'IGNORE KNOCK',
            'NO RECOIL',
            'UP PLAYER WHILE FIRING',
            'GHOST HACK',
            'SHAKE KILL',
            'FREEZE KILL',
            'UNDER KILL',
            'TELE KILL 10 MIN',
            'DOUBLE GUN',
            'SPEED HACK 7x',
            'ESP LINE BOX INFO',
            'ESP SKELETON',
            'ESP MINI MAP WEAPON',
            'HOT KEY',
            'STREAMER MODE',
            'RANK WORKING'
        ]
    },
    'ngc-uid-bypass': {
        name: 'NGC UID BYPASS',
        pricing: [
            { duration: '10 Days', price: '₹600' },
            { duration: '30 Days', price: '₹1300' },
            { duration: 'Lifetime', price: '₹5000' }
        ],
        description: 'Bypass emulator detection and play CS Rank and BR Rank matches with mobile players for seamless gaming experience.',
        features: [
            'Emulator Logo Bypass',
            'CS Rank Support',
            'BR Rank Support',
            'Mobile Player Matchmaking',
            'Seamless Gaming Experience'
        ]
    }
};

// Demo video data with YouTube video IDs
const demoVideos = {
    'aimbot-external': {
        title: 'Aimbot External Demo',
        videoId: 'dQw4w9WgXcQ', // Gaming demo placeholder - replace with actual aimbot demo
        description: 'Watch how our advanced external aimbot provides smooth, precise targeting with customizable settings.',
        highlights: [
            'Smooth aim technology in action',
            'Bone selection demonstration',
            'FOV customization showcase',
            'Undetectable operation proof'
        ]
    },
    'internal-basic': {
        title: 'Internal Basic Demo',
        videoId: 'jNQXAC9IVRw', // Gaming demo placeholder - replace with actual internal cheat demo
        description: 'See our essential internal cheat package featuring wallhack, ESP, and basic aimbot functionality.',
        highlights: [
            'Wallhack/ESP visualization',
            'Basic aimbot performance',
            'Player information display',
            'Safe injection process'
        ]
    },
    'silent-aim': {
        title: 'Silent Aim Demo',
        videoId: 'L_jWHffIx5E', // Gaming demo placeholder - replace with actual silent aim demo
        description: 'Experience the power of invisible targeting that hits enemies without moving your crosshair.',
        highlights: [
            'Invisible targeting demonstration',
            'No crosshair movement proof',
            'Advanced prediction system',
            'Anti-cheat bypass technology'
        ]
    },
    'aimkill': {
        title: 'Aimkill Demo',
        videoId: 'kJQP7kiw5Fk', // Gaming demo placeholder - replace with actual aimkill demo
        description: 'Witness the ultimate precision tool with instant kill capabilities and target prioritization.',
        highlights: [
            'Instant kill mode showcase',
            'Target prioritization system',
            'Damage multiplier effects',
            'Rage mode demonstration'
        ]
    },
    'streamer-panel': {
        title: 'Streamer Panel Demo',
        videoId: 'ZZ5LpwO-An4', // Gaming demo placeholder - replace with actual streamer panel demo
        description: 'Explore the professional streaming overlay with viewer-safe interface and customizable controls.',
        highlights: [
            'Viewer-safe interface design',
            'Custom hotkey configuration',
            'Overlay control system',
            'Stream integration features'
        ]
    },
    'emulator-bypass': {
        title: 'Emulator Bypass Demo',
        videoId: 'ALZHF5UqnU4', // Gaming demo placeholder - replace with actual emulator bypass demo
        description: 'Learn how our advanced emulator detection bypass works for mobile gaming on PC.',
        highlights: [
            'Emulator detection bypass',
            'Device spoofing capabilities',
            'Hardware ID masking',
            'Mobile game compatibility'
        ]
    }
};

// YouTube API ready function
function onYouTubeIframeAPIReady() {
    // API is ready, player will be created when demo is opened
}

// Create YouTube player
function createYouTubePlayer(videoId) {
    if (player) {
        player.destroy();
    }
    
    player = new YT.Player('demoPlayer', {
        height: '450',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': function(event) {
                // Player is ready
            }
        }
    });
}

// Purchase Modal Functionality
purchaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-product');
        const product = products[productId];
        
        if (product) {
            const pricingHTML = product.pricing.map(tier =>
                `<div class="pricing-option">
                    <span class="duration">${tier.duration}</span>
                    <span class="price">${tier.price}</span>
                </div>`
            ).join('');
            
            selectedProductDiv.innerHTML = `
                <div class="selected-product">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="pricing-options">
                        <h4>Select Duration:</h4>
                        <div class="pricing-grid">
                            ${pricingHTML}
                        </div>
                    </div>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                    <div class="purchase-note">
                        <p><i class="fas fa-info-circle"></i> Join our Discord server to purchase and get instant support</p>
                    </div>
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Demo Video Modal Functionality
demoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-product') || e.target.closest('.demo-btn').getAttribute('data-product');
        const demo = demoVideos[productId];
        
        if (demo) {
            demoTitle.textContent = demo.title;
            demoDescription.textContent = demo.description;
            
            // Clear and populate demo features
            demoFeatures.innerHTML = '';
            demo.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.textContent = highlight;
                demoFeatures.appendChild(li);
            });
            
            // Create YouTube player
            createYouTubePlayer(demo.videoId);
            
            demoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close demo modal functionality
closeDemoModal.addEventListener('click', () => {
    demoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (player && player.pauseVideo) {
        player.pauseVideo();
    }
});

window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
    }
});

// Escape key to close demo modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.style.display === 'block') {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
    }
});

// Close modal functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Purchase Form Submission
purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = purchaseForm.querySelector('input[type="email"]').value;
    const discord = purchaseForm.querySelector('input[type="text"]').value;
    const paymentMethod = purchaseForm.querySelector('select').value;
    
    if (!email || !discord || !paymentMethod) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate purchase process
    showNotification('Purchase initiated! Check your email for payment instructions.', 'success');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    purchaseForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Scroll animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature-item, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 25px 50px rgba(220, 53, 69, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(220, 53, 69, 0.2)';
    });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

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
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = 'NEXT GEN CHEATS';
        typeWriter(heroTitle, originalText, 100);
    }
});

// Counter animation for pricing
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when pricing section is visible
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElements = entry.target.querySelectorAll('.price-amount');
            priceElements.forEach(priceEl => {
                const priceText = priceEl.textContent;
                const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                if (priceNumber) {
                    priceEl.innerHTML = `$<span class="counter">0</span><span>${priceText.substring(priceText.indexOf('.'))}</span>`;
                    const counter = priceEl.querySelector('.counter');
                    animateCounter(counter, Math.floor(priceNumber), 1500);
                }
            });
            pricingObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        pricingObserver.observe(pricingSection);
    }
});

// Add CSS for notifications and ripple effect
const additionalStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3000;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}

.notification-error {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}

.notification-info {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    color: #0c5460;
}

.notification-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.7;
}

.notification-close:hover {
    opacity: 1;
}

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

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
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

.selected-product {
    text-align: center;
    margin-bottom: 1rem;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00ff7f;
    text-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
    margin: 0.5rem 0;
}

.product-features {
    list-style: none;
    text-align: left;
    margin: 1rem 0;
}

.product-features li {
    padding: 0.25rem 0;
    color: #555;
}

.product-features i {
    color: #28a745;
    margin-right: 0.5rem;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00ff7f', '#00cc66', '#39ff14', '#00ff00']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff7f',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for particles.js to load
    setTimeout(initParticles, 100);
});

// Also try to initialize when window loads (fallback)
window.addEventListener('load', () => {
    if (!document.querySelector('#particles-js canvas')) {
        setTimeout(initParticles, 200);
    }
});
