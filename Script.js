document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling & Active Nav Link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Prevent default only if it's just a hash link

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Smooth scroll
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        document.body.style.overflow = ''; // Restore scroll
                    }
                }
            }
        });
    });

    // Highlight active nav link on scroll
    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Initial call

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Optional: Prevent body scroll when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
        // Set animation based on data-animation attribute
        const animationType = element.dataset.animation || 'fadeInUp'; // Default to fadeInUp
        element.classList.add(animationType); // Add the specific animation class
        // Apply delay if specified
        if (element.dataset.delay) {
            element.style.transitionDelay = element.dataset.delay;
        }
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
        const animationType = element.dataset.animation || 'fadeInUp';
        element.classList.remove(animationType);
        if (element.dataset.delay) {
            element.style.transitionDelay = null;
        }
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) { // Trigger when 80% of the element is in view
                displayScrollElement(el);
            }
            // Optional: To re-trigger animation every time it scrolls into view (remove 'is-visible' check)
            // else if (!elementInView(el, 0) && el.classList.contains('is-visible')) {
            // hideScrollElement(el); // To hide when it scrolls out of view from top
            // }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check on page load

    // --- Sticky Header Shadow on Scroll ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }
        });
    }

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Parallax-like 3D effects on mouse move (optional, can be performance intensive) ---
    // const heroSection = document.querySelector('.hero-section');
    // if (heroSection) {
    //     heroSection.addEventListener('mousemove', (e) => {
    //         const { clientX, clientY } = e;
    //         const { offsetWidth, offsetHeight } = heroSection;
    //
    //         const xRotation = ((clientY - offsetHeight / 2) / offsetHeight) * 10; // Max 10deg rotation
    //         const yRotation = ((clientX - offsetWidth / 2) / offsetWidth) * -10; // Max 10deg rotation
    //
    //         const heroContent = heroSection.querySelector('.hero-content');
    //         const heroBgElement = heroSection.querySelector('.hero-bg-element');
    //
    //         if (heroContent) {
    //             heroContent.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(20px)`;
    //         }
    //         if (heroBgElement) {
    //             // Apply a slightly different transform for a parallax depth effect
    //             heroBgElement.style.transform = `rotateX(${xRotation * 0.5}deg) rotateY(${yRotation * 0.5}deg) translateZ(-100px) rotate(15deg)`;
    //         }
    //     });
    //
    //     heroSection.addEventListener('mouseleave', () => {
    //         const heroContent = heroSection.querySelector('.hero-content');
    //         const heroBgElement = heroSection.querySelector('.hero-bg-element');
    //         if (heroContent) heroContent.style.transform = 'rotateX(0) rotateY(0) translateZ(20px)';
    //         if (heroBgElement) heroBgElement.style.transform = 'translateY(0) rotate(15deg) translateZ(-100px)'; // Reset to floating animation base
    //     });
    // }

    // --- Prevent form submission for demo ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! (This is a demo - no data is actually sent)');
            contactForm.reset();
            // Reset floating labels
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    // This simply resets the visual state; a more robust solution might be needed
                    // if you had complex state management for these labels.
                    // For this demo, resetting the form should visually reset them.
                }
            });
        });
    }
});