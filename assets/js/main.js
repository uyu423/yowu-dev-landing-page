(function() {
    "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        
        // 1. Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(22, 22, 24, 0.95)';
                navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(22, 22, 24, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });

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
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement){
                    const navHeight = 80; // --nav-height
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
