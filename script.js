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
    strings: ["AI Engineer", "Robotics Researcher", "Software Developer"],
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