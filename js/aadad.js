// Aadad Company Website JavaScript

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Header scroll effect
const header = document.getElementById('header');
const heroSection = document.getElementById('home');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
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

// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (data.name && data.email && data.subject && data.message) {
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        alert('يرجى ملء جميع الحقول المطلوبة');
    }
});

// Add loading animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('loading');
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = heroSection.querySelector('.hero-content');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .value-card, .team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Hero Background Slider
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showNextSlide() {
    // Remove active class from current slide
    heroSlides[currentSlide].classList.remove('active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % heroSlides.length;

    // Add active class to new slide
    heroSlides[currentSlide].classList.add('active');
}

// Auto-change slides every 5 seconds
if (heroSlides.length > 1) {
    setInterval(showNextSlide, 5000);
}

// Add typing effect to hero title
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
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
});

// Add modern scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--brand) 0%, var(--brand-light) 50%, #EC4899 100%);
    z-index: 9999;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
`;
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Add active navigation highlighting
const sections = document.querySelectorAll('.section');
const navigationLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Enhanced card interactions
document.querySelectorAll('.service-card, .value-card, .team-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// Initialize Swiper for Projects
const projectsSwiper = new Swiper('.projects-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.projects-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.projects-slider-container .external-nav .swiper-button-next',
        prevEl: '.projects-slider-container .external-nav .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

// Initialize Swiper for Values
const valuesSwiper = new Swiper('.values-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.values-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.values-slider-container .external-nav .swiper-button-next',
        prevEl: '.values-slider-container .external-nav .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

