// Sticky header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky-active");
    } else {
        header.classList.remove("sticky-active");
    }
});

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

// Interactive mouse-reactive background
(function initInteractiveBackground() {
    const canvas = document.getElementById('interactive-bg');
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let mouse = { x: -1000, y: -1000 };
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 70;
    const connectionDistance = 130;
    const mouseRadius = 160;

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

    function updateMousePosition(x, y) {
        mouse.x = x;
        mouse.y = y;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.hypot(dx, dy);

            if (distance < mouseRadius && distance > 0) {
                const force = ((mouseRadius - distance) / mouseRadius) * 0.6;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
            }

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < connectionDistance) {
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

        particles.forEach((particle) => {
            ctx.fillStyle = 'rgba(88, 170, 255, 0.55)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (event) => {
        updateMousePosition(event.clientX, event.clientY);
    });

    window.addEventListener('mouseleave', () => {
        updateMousePosition(-1000, -1000);
    });

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();
})();