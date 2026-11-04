

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Curriculum accordion
document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
        const module = header.parentElement;
        module.classList.toggle('active');
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        alert('Thank you for subscribing! We\'ll keep you updated.');
        e.target.reset();
    });
}

// Disable custom cursor on mobile devices
