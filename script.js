document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // Initialize Swiper for Transformations
    new Swiper('.transformation-slider', {
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Initialize Swiper for Trainers
    new Swiper('.trainers-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        autoplay: {
            delay: 4000,
        },
    });

    // Initialize Swiper for Testimonials
    new Swiper('.testimonial-slider', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 6000,
        },
    });

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // Add style for scroll progress via JS
    const style = document.createElement('style');
    style.innerHTML = `
        #scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(to right, #FF4D00, #FF0000);
            z-index: 1100;
            width: 0;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Countdown Timer
    const countdown = () => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2); // 2 days from now
        
        const update = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

            if (distance < 0) {
                clearInterval(timer);
            }
        };

        const timer = setInterval(update, 1000);
        update();
    };
    countdown();

    // Exit Intent Popup
    let showedPopup = false;
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !showedPopup) {
            document.getElementById('exit-popup').style.display = 'flex';
            showedPopup = true;
        }
    });

    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('exit-popup').style.display = 'none';
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open (though we don't have one yet)
            }
        });
    });

    // Form Submission (Simulated)
    const form = document.getElementById('membership-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerText = 'PROCESSING...';
        btn.disabled = true;

        setTimeout(() => {
            alert('SUCCESS! Your free trial has been reserved. Our team will contact you shortly via WhatsApp/Phone.');
            btn.innerText = originalText;
            btn.disabled = false;
            form.reset();
        }, 2000);
    });
});
