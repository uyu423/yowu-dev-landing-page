(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // 0. Sticky Navbar Logic
        // ==========================================
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ==========================================
        // 1. Typing Effect (Hero Section)
        // ==========================================
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const words = ["Backend Developer", "System Architect", "Tech Writer", "Amateur Drummer"];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typeSpeed = 100;

            function type() {
                const currentWord = words[wordIndex];

                if (isDeleting) {
                    typingText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 50; // Deleting speed
                } else {
                    typingText.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 100; // Typing speed
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    // Finished typing word
                    isDeleting = true;
                    typeSpeed = 2000; // Pause at end
                } else if (isDeleting && charIndex === 0) {
                    // Finished deleting word
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500; // Pause before new word
                }

                setTimeout(type, typeSpeed);
            }

            // Start typing effect
            setTimeout(type, 1000);
        }

        // ==========================================
        // 2. Background Video Cross-fade Logic
        // ==========================================
        const video1 = document.getElementById('video-1');
        const video2 = document.getElementById('video-2');

        if (video1 && video2) {
            const playlist = [
                'videos/bg-deserteagle-optimized.mp4',
                'videos/bg-dna-optimized.mp4',
                'videos/bg-qwer-optimized.mp4',
                'videos/bg-believe-optimized.mp4'
            ];

            let currentIndex = 0;
            let activeVideo = video1;
            let nextVideo = video2;

            const handleVideoEnd = () => {
                currentIndex = (currentIndex + 1) % playlist.length;
                const nextSource = playlist[currentIndex];

                nextVideo.src = nextSource;
                nextVideo.load();

                nextVideo.play().then(() => {
                    nextVideo.classList.add('active');
                    activeVideo.classList.remove('active');

                    const temp = activeVideo;
                    activeVideo = nextVideo;
                    nextVideo = temp;

                    nextVideo.removeEventListener('ended', handleVideoEnd);
                    activeVideo.addEventListener('ended', handleVideoEnd);

                }).catch(e => {
                    console.error('Video play error:', e);
                });
            };

            activeVideo.addEventListener('ended', handleVideoEnd);
        }

        // ==========================================
        // 3. Scroll Reveal & Number Counting
        // ==========================================

        // Setup Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Trigger number counting if it's the stats section
                    if (entry.target.classList.contains('stats-section')) {
                        startCounting();
                    }

                    // Stop observing once revealed (optional)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });

        // Number Counting Logic
        let hasCounted = false;
        function startCounting() {
            if (hasCounted) return;
            hasCounted = true;

            const counters = document.querySelectorAll('.number');
            const speed = 200; // The lower the slower

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Lower increment for smoother animation on small numbers
                    const inc = target / speed;

                    if (count < target) {
                        // Check if we reached target to avoid overshooting
                        if (Math.ceil(count + inc) >= target) {
                            counter.innerText = target + "+";
                        } else {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        }
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        }

        // ==========================================
        // 4. Initial Hero Fade In
        // ==========================================
        const elements = document.querySelectorAll('.hero-content > *, .hero-image-wrapper');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });

        // ==========================================
        // 5. Smooth Scroll for Anchor Links
        // ==========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = 70; // Height of sticky navbar
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

    });

})();
