(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // 0. Sticky Navbar Logic (Disabled)
        // ==========================================
        // const navbar = document.getElementById('navbar');

        // window.addEventListener('scroll', () => {
        //     if (window.scrollY > 50) {
        //         navbar.classList.add('scrolled');
        //     } else {
        //         navbar.classList.remove('scrolled');
        //     }
        // });

        // ==========================================
        // 1. Typing Effect (Hero Section)
        // ==========================================
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const words = [
                "Backend Developer",
                "Software Engineer",
                "System Architect",
                "Technical Writer",
                "Amateur Drummer"
            ];
            let wordIndex = 0;
            // Initialize with the length of the first word since it's hardcoded in HTML
            let charIndex = words[0].length;
            let isDeleting = false;
            let typeSpeed = 100;

            function type() {
                const currentWord = words[wordIndex];

                if (isDeleting) {
                    typingText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 50; // Deleting speed
                } else {
                    // Only type if we haven't reached the end of the word
                    if (charIndex < currentWord.length) {
                        typingText.textContent = currentWord.substring(0, charIndex + 1);
                        charIndex++;
                        typeSpeed = 100; // Typing speed
                    }
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

            // Start typing effect after initial delay (allow user to read first word)
            setTimeout(type, 2000);
        }

        // ==========================================
        // 2. Background Video Cross-fade Logic
        // ==========================================
        const video1 = document.getElementById('video-1');
        const video2 = document.getElementById('video-2');

        if (video1 && video2) {
            // Check if mobile device (width <= 768px matches CSS breakpoint)
            const isMobile = window.innerWidth <= 768;
            const suffix = isMobile ? '-mobile.mp4' : '-optimized.mp4';

            const playlist = [
                `videos/bg-deserteagle${suffix}`,
                `videos/bg-qwer${suffix}`,
                `videos/bg-realize${suffix}`,
                `videos/bg-dna${suffix}`,
                `videos/bg-deserteagle2${suffix}`,
                `videos/bg-believe${suffix}`,
            ];

            // Video Preloading Logic
            const preloadVideos = () => {
                playlist.forEach(url => {
                    // Use fetch to trigger browser caching
                    fetch(url).then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        // The response is now in the browser cache
                    }).catch(err => {
                        console.warn('Failed to preload video:', url, err);
                    });
                });
            };

            // Start preloading after the page has fully loaded to avoid blocking critical resources
            window.addEventListener('load', () => {
                // Use requestIdleCallback if available, otherwise setTimeout
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(() => preloadVideos());
                } else {
                    setTimeout(preloadVideos, 1000);
                }
            });
            
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

            // Page Visibility API to save resources
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    activeVideo.pause();
                } else {
                    activeVideo.play().catch(e => console.error('Resume play error:', e));
                }
            });
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
            const duration = 2000; // 2초 동안 카운팅

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || "+"; // 접미사 (기본값 +)
                let startTimestamp = null;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    // Ease Out 효과 (천천히 감속)
                    const easeProgress = 1 - Math.pow(1 - progress, 3);

                    const currentCount = Math.floor(easeProgress * target);
                    counter.innerText = currentCount + suffix; // 카운팅 중에도 접미사 유지

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                window.requestAnimationFrame(step);
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
