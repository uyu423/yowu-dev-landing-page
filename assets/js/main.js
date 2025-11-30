(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        // 1. Background Video Playlist with Fade Transition
        const videoElement = document.getElementById('bg-video');
        if (videoElement) {
            const playlist = [
                'videos/bg-deserteagle-optimized.mp4',
                'videos/bg-dna-optimized.mp4',
                'videos/bg-qwer-optimized.mp4',
                'videos/bg-believe-optimized.mp4'
            ];
            let currentVideoIndex = 0;

            // 초기 영상 설정 (HTML에 하드코딩된 소스가 없을 경우 대비)
            // videoElement.src = playlist[0]; 

            videoElement.addEventListener('ended', () => {
                // 1. Fade Out
                videoElement.classList.add('fade-out');

                // 2. Wait for transition, then change source & Fade In
                setTimeout(() => {
                    currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
                    videoElement.src = playlist[currentVideoIndex];

                    videoElement.play().then(() => {
                        // Play success -> Fade In
                        videoElement.classList.remove('fade-out');
                    }).catch(e => {
                        console.log('Video play error:', e);
                        // Even if error, try to show video element
                        videoElement.classList.remove('fade-out');
                    });
                }, 500); // Match CSS transition duration (0.5s)
            });
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
                    const navHeight = 0; // Navbar Removed
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
