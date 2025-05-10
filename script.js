// Loading screen handling
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading process
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
        initTypewriter();
        initMatrixEffect();
        initParticles();
        updateTime();
        initPageTransitions();
        setupElementAnimations();
    }, 3000);
    
    // Initialize other features
    initializeTypewriter();
    initializeMatrixEffect();
    initializeParticles();
    updateTime();
    setInterval(updateTime, 1000);
    startUptimeCounter();
    initializeHolographicEffects();
    initializeSectionAnimation();
    initializeFormValidation();
    
    // Initialize audio system
    initAudioSystem();
});

// -----------------------------------------------------
// Typing animation
// -----------------------------------------------------
const phrases = [
    'Full Stack Development',
    'Web Applications',
    'Responsive Design',
    'Software Architecture',
    'Problem Solving'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;

function initializeTypewriter() {
    setTimeout(typeEffect, 1000);
}

function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isPaused) {
        if (!isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === currentPhrase.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000);
            }
        } else {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
        }
    }

    const typingSpeed = isDeleting ? 50 : 150;
    setTimeout(typeEffect, typingSpeed);
}

// -----------------------------------------------------
// Matrix Rain Effect
// -----------------------------------------------------
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = "01010101010101010".split("");
    const columns = Math.floor(canvas.width / 20);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }

    function draw() {
        ctx.fillStyle = "rgba(10, 25, 47, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00f7ff";
        ctx.font = "15px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }

    setInterval(draw, 80);
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// -----------------------------------------------------
// Particle Background
// -----------------------------------------------------
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00f7ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
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
                    color: "#00f7ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// -----------------------------------------------------
// Time and Date Functions
// -----------------------------------------------------
function updateTime() {
    const now = new Date();
    
    // Update digital clock
    const timeElem = document.getElementById('time');
    if (timeElem) {
        timeElem.textContent = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    }
    
    const dateElem = document.getElementById('date');
    if (dateElem) {
        dateElem.textContent = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        }).replace(/\//g, '.');
    }
}

// -----------------------------------------------------
// Uptime Counter
// -----------------------------------------------------
function startUptimeCounter() {
    const uptimeElement = document.getElementById('uptime-counter');
    if (!uptimeElement) return;
    
    let seconds = 0;
    
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        uptimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
}

// -----------------------------------------------------
// Navigation handling
// -----------------------------------------------------
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Update active section
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            
            // Update active navigation link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// -----------------------------------------------------
// Holographic Effects
// -----------------------------------------------------
function initializeHolographicEffects() {
    // Holographic elements following mouse movement
    document.addEventListener('mousemove', (e) => {
        const circles = document.querySelectorAll('.holographic-element');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        circles.forEach((circle, index) => {
            const rect = circle.getBoundingClientRect();
            const circleX = rect.left + rect.width / 2;
            const circleY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to circle center
            const distX = mouseX - circleX;
            const distY = mouseY - circleY;
            
            // Apply subtle movement effect (inverse relationship so elements move away from cursor)
            const factor = index === 0 ? -0.02 : -0.03; // Different factor for each circle
            const translateX = distX * factor;
            const translateY = distY * factor;
            
            circle.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
    
    // Add scan line effect on interactions
    document.addEventListener('click', () => {
        const scanLine = document.createElement('div');
        scanLine.classList.add('interaction-scan');
        document.body.appendChild(scanLine);
        
        setTimeout(() => {
            scanLine.remove();
        }, 1000);
    });
    
    // Initialize mobile menu toggle
    initializeMobileNav();
}

// -----------------------------------------------------
// Mobile Navigation Toggle
// -----------------------------------------------------
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    
    if (hamburger && sideNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sideNav.classList.toggle('mobile-open');
        });
        
        // Close mobile nav when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    sideNav.classList.remove('mobile-open');
                }
            });
        });
    }
}

// -----------------------------------------------------
// Intersection Observer for Element Animation
// -----------------------------------------------------
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Audio feedback on interactions (optional, can be enabled by user action)
function enableAudioFeedback() {
    const audioElements = {
        hover: new Audio('assets/audio/hover.mp3'),
        click: new Audio('assets/audio/click.mp3')
    };
    
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            audioElements.hover.currentTime = 0;
            audioElements.hover.play().catch(() => {});
        });
        
        element.addEventListener('click', () => {
            audioElements.click.currentTime = 0;
            audioElements.click.play().catch(() => {});
        });
    });
}

// -----------------------------------------------------
// Section Animation
// -----------------------------------------------------
function initializeSectionAnimation() {
    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section becomes visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Update active link in navigation
                updateActiveNavLink(entry.target.id);
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
        
        // Add initial visible class to active section
        if (section.classList.contains('active')) {
            section.classList.add('visible');
        }
    });
    
    // Set initial active link
    updateActiveNavLink('home');
}

function updateActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.getPropertyValue('--level');
        }, index * 100);
    });
}

// -----------------------------------------------------
// Form Validation
// -----------------------------------------------------
function initializeFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                highlightInvalidField(nameInput);
                isValid = false;
            } else {
                resetField(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightInvalidField(emailInput);
                isValid = false;
            } else {
                resetField(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                highlightInvalidField(subjectInput);
                isValid = false;
            } else {
                resetField(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightInvalidField(messageInput);
                isValid = false;
            } else {
                resetField(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<span class="btn-text">SENDING...</span>';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.innerHTML = '<span class="btn-text">MESSAGE SENT!</span>';
                    
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }
}

function highlightInvalidField(field) {
    field.style.borderColor = '#ff0055';
    field.style.boxShadow = '0 0 10px rgba(255, 0, 85, 0.5)';
}

function resetField(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// -----------------------------------------------------
// Page Transitions
// -----------------------------------------------------
function initPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const overlay = document.querySelector('.page-transition-overlay');
    const lines = document.querySelector('.transition-lines');
    
    // Set initial active section
    if (sections.length > 0) {
        const firstSection = sections[0];
        firstSection.classList.add('active');
        firstSection.classList.add('visible');
        
        // Find and activate the corresponding nav link
        const firstSectionId = firstSection.id;
        const correspondingNavLink = document.querySelector(`.nav-links a[href="#${firstSectionId}"]`);
        if (correspondingNavLink) {
            correspondingNavLink.classList.add('active');
        }
    }
    
    // Assign index values to elements for staggered animations
    document.querySelectorAll('#skills .skills-category').forEach((el, index) => {
        el.style.setProperty('--i', index);
    });
    
    document.querySelectorAll('#projects .project-card').forEach((el, index) => {
        el.style.setProperty('--i', index);
    });
    
    document.querySelectorAll('#experience .timeline-item').forEach((el, index) => {
        el.style.setProperty('--i', index);
    });
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the link's href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // If the section exists and is not already active
            if (targetSection && !targetSection.classList.contains('active')) {
                // Play transition animations
                overlay.classList.add('active');
                lines.classList.add('active');
                
                // Add 'active' class to clicked nav link and remove from others
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // After a short delay, switch sections
                setTimeout(() => {
                    // Hide all sections
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show the target section
                    targetSection.classList.add('active');
                    targetSection.classList.add('visible');
                    
                    // Play audio feedback
                    playAudio('transition');
                }, 400);
                
                // Remove the transition classes after animation completes
                setTimeout(() => {
                    overlay.classList.remove('active');
                    lines.classList.remove('active');
                }, 1500);
            }
        });
    });

    // Handle hash change for direct links
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            const targetLink = document.querySelector(`.nav-links a[href="#${hash}"]`);
            
            if (targetSection && targetLink) {
                // Simulate click on the nav link
                targetLink.click();
            }
        }
    });

    // Check for hash in URL on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.nav-links a[href="#${hash}"]`);
        if (targetLink) {
            setTimeout(() => {
                targetLink.click();
            }, 3100); // Just after loading screen disappears
        }
    }
}

// -----------------------------------------------------
// Setup Animations
// -----------------------------------------------------
function setupElementAnimations() {
    // Use Intersection Observer to animate elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate when scrolled into view
    document.querySelectorAll('.about-stats .stat-item, .skills-category, .project-card, .timeline-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// -----------------------------------------------------
// Audio System
// -----------------------------------------------------
let soundEnabled = true;

// Create audio elements for different sounds
const audioElements = {
    hover: new Audio('assets/audio/hover.mp3'),
    click: new Audio('assets/audio/click.mp3'),
    transition: new Audio('assets/audio/transition.mp3'),
    typing: new Audio('assets/audio/typing.mp3')
};

// Set volume levels (reduced for less annoyance)
audioElements.hover.volume = 0.1;
audioElements.click.volume = 0.15;
audioElements.transition.volume = 0.2;
audioElements.typing.volume = 0.3; // Increased typing sound volume

function playAudio(type) {
    if (!soundEnabled) return;
    
    try {
        const audio = audioElements[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => console.log('Audio play error:', error));
        }
    } catch (error) {
        console.log('Audio play error:', error);
    }
}

// Create and add sound toggle button
function createSoundToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'sound-toggle';
    toggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    toggle.title = 'Toggle Sound';
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        toggle.innerHTML = soundEnabled ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-volume-mute"></i>';
        playAudio('click');
    });
}

// Profile Image Modal
function initializeProfileModal() {
    const profileImage = document.querySelector('.profile-img img');
    if (!profileImage) return;

    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${profileImage.src}" alt="Profile Image">
        </div>
    `;
    document.body.appendChild(modal);

    profileImage.addEventListener('click', () => {
        modal.classList.add('active');
        playAudio('click');
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        playAudio('click');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            playAudio('click');
        }
    });
}

// Contact button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for contact button
    const contactBtn = document.querySelector('.cta-button');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                // Update active section
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                contactSection.classList.add('active');
                
                // Update active navigation link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                const contactLink = document.querySelector('.nav-links a[href="#contact"]');
                if (contactLink) {
                    contactLink.classList.add('active');
                }
                
                // Smooth scroll to contact section
                contactSection.scrollIntoView({ behavior: 'smooth' });
                playAudio('click');
            }
        });
    }
});

// Contact Form Enhancement
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');
    let typingTimeout;
    
    // Add typing sound to inputs with debounce
    inputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            // Don't play sound for special keys
            if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Shift' || 
                e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
                return;
            }
            
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                playAudio('typing');
            }, 50); // Reduced debounce time for more responsive typing sound
        });
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        playAudio('click');
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        try {
            submitButton.innerHTML = '<span class="btn-text">SENDING...</span>';
            submitButton.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitButton.innerHTML = '<span class="btn-text">MESSAGE SENT!</span>';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        } catch (error) {
            submitButton.innerHTML = '<span class="btn-text">ERROR SENDING</span>';
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// Initialize all features
function initAudioSystem() {
    createSoundToggle();
    initializeProfileModal();
    initializeContactForm();
    
    // Add hover sounds to interactive elements (reduced frequency)
    document.querySelectorAll('.nav-links a, .btn, .project-card, .social-icon').forEach(el => {
        let hoverTimeout;
        el.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => playAudio('hover'), 100);
        });
        el.addEventListener('click', () => playAudio('click'));
    });
}

// Add hover sounds to interactive elements
document.querySelectorAll('.nav-links a, .btn, .project-card, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => playAudio('hover'));
    el.addEventListener('click', () => playAudio('click'));
}); 