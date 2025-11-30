(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        // 1. Background Video Cross-fade Logic
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

            // Function to handle video transition
            const handleVideoEnd = () => {
                // Calculate next index
                currentIndex = (currentIndex + 1) % playlist.length;
                const nextSource = playlist[currentIndex];

                // Prepare next video
                nextVideo.src = nextSource;
                nextVideo.load();

                nextVideo.play().then(() => {
                    // Swap classes for cross-fade
                    nextVideo.classList.add('active');
                    activeVideo.classList.remove('active');

                    // Swap references
                    const temp = activeVideo;
                    activeVideo = nextVideo;
                    nextVideo = temp;

                    // Re-attach event listener to new active video
                    // (Remove from old to prevent duplicates if logic changes, though 'once' option can be used)
                    nextVideo.removeEventListener('ended', handleVideoEnd);
                    activeVideo.addEventListener('ended', handleVideoEnd);

                }).catch(e => {
                    console.error('Video play error:', e);
                });
            };

            // Start loop
            activeVideo.addEventListener('ended', handleVideoEnd);
        }

        // 2. Initial Fade In
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

        // 3. Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = 0;
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
