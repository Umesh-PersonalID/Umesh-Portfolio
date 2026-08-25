// Page load fade-in
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});

// Sticky header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky-active");
    } else {
        header.classList.remove("sticky-active");
    }
}, { passive: true });

// Navbar toggle button
var togglebtn = document.querySelector(".togglebtn");
var nav = document.querySelector(".navlinks");

togglebtn.addEventListener("click", function () {
    this.classList.toggle("click");
    nav.classList.toggle("open");
});

// Typed.js animation
var typed = new Typed(".input", {
    strings: ["AI Software Engineer", "Generative AI Engineer", "Full Stack Developer"],
    typeSpeed: 50,
    backSpeed: 55,
    loop: true
});

// Scroll-triggered fade-in animation
const faders = document.querySelectorAll('.fade-in');
const timeline = document.querySelector('.timeline');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.target.classList.contains('timeline')) {
            timeline.classList.add('reveal-line');
        }
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
appearOnScroll.observe(timeline);


const videos = document.querySelectorAll('.hover-video');

videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Interactive mouse-reactive background (performance-optimized)
(function initInteractiveBackground() {
    const canvas = document.getElementById('interactive-bg');
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let mouse = { x: -1000, y: -1000 };
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 45;
    const connectionDistance = 130;
    const mouseRadius = 160;
    let lastMouseUpdate = 0;
    let isVisible = true;
    let animId = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.2 + 0.6
        }));
    }

    function animate() {
        if (!isVisible) {
            animId = requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = dx * dx + dy * dy;
            const mouseR2 = mouseRadius * mouseRadius;

            if (dist < mouseR2 && dist > 0) {
                const distance = Math.sqrt(dist);
                const force = ((mouseRadius - distance) / mouseRadius) * 0.6;
                p.vx += (dx / distance) * force;
                p.vy += (dy / distance) * force;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;

            if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
            if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
            p.x = Math.max(0, Math.min(canvas.width, p.x));
            p.y = Math.max(0, Math.min(canvas.height, p.y));
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = dx * dx + dy * dy;
                const conn2 = connectionDistance * connectionDistance;

                if (dist < conn2) {
                    const distance = Math.sqrt(dist);
                    const opacity = 0.18 * (1 - distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 124, 237, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        glow.addColorStop(0, 'rgba(0, 124, 237, 0.14)');
        glow.addColorStop(1, 'rgba(0, 124, 237, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(88, 170, 255, 0.55)';
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 6.2832);
            ctx.fill();
        }

        animId = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (event) => {
        const now = performance.now();
        if (now - lastMouseUpdate < 16) return;
        lastMouseUpdate = now;
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    }, { passive: true });

    resize();
    createParticles();
    animate();
})();