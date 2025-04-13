const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const intro = document.getElementById('intro');
const header = document.getElementById('header');
const mainContent = document.querySelector('.main-content');
const slideshow = document.getElementById('slideshow');
const modal = document.getElementById('newsletter-modal');
const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const profileIcon = document.querySelector('.profile-icon');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

const slideDownDelay = 20;
const slideDownDuration = 70;
const slideUpDelay = slideDownDelay + slideDownDuration + 1000;
const fadeOutDelay = slideUpDelay + 1000;

let lastScrollY = window.scrollY;
let ticking = false;

const startAnimation = () => {

    setTimeout(() => {
        slide1.classList.add('slide-up');
        slide2.classList.add('slide-down');
    }, slideDownDelay);

    setTimeout(() => {
        intro.classList.add('fade-out');
    }, fadeOutDelay);
    
};

const updateHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('compact');
    } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        header.classList.remove('compact');
    }

    lastScrollY = currentScrollY;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

function toggleMenu() {
    const nav = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    
    nav.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    const spans = hamburger.querySelectorAll('span');
    if (nav.classList.contains('show')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
}

document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    
    if (!e.target.closest('nav') && !e.target.closest('.hamburger') && nav.classList.contains('show')) {
        toggleMenu();
    }
});

profileIcon.addEventListener('mouseenter', () => {
    profileIcon.style.transform = 'scale(1.1) rotate(5deg)';
    profileIcon.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
});

profileIcon.addEventListener('mouseleave', () => {
    profileIcon.style.transform = '';
    profileIcon.style.boxShadow = '';
});

let scrollPos = 0;
setInterval(() => {
    scrollPos += 320;
    if (scrollPos >= slideshow.scrollWidth - slideshow.clientWidth) {
        scrollPos = 0;
    }
    slideshow.scrollTo({ left: scrollPos, behavior: 'smooth' });
}, 3000);


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    console.log(`Email submitted: ${email}`);
    modal.style.display = 'none';
    alert('Thank you for subscribing!');
});

document.addEventListener('DOMContentLoaded', startAnimation);
