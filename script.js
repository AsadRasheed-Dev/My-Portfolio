// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Typing Effect
const typed = new Typed(".typing", {
    strings: [
        "Full Stack Developer", 
        "React Specialist", 
        "AI Agent Developer",
        "C++ Programmer",
        "DevOps Enthusiast"
    ],
    typeSpeed: 80,
    backSpeed: 60,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});

// Animate skill bars on scroll
const skillItems = document.querySelectorAll(".skill-item");

const animateSkills = () => {
    skillItems.forEach((item) => {
        const level = item.getAttribute("data-level");
        const fill = item.querySelector(".skill-fill");
        fill.style.width = level + "%";
    });
};

// Intersection Observer for skill animation
const skillsSection = document.getElementById("skills");
const observerOptions = {
    threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        // Formspree will handle the submission
        // You can add loading state here if needed
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    });
}

// Smooth scroll for Safari
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Tech Marquee - infinite wrap-around (icon exits left -> reappears right)
const marqueeContent = document.querySelector(".marquee-content");
if (marqueeContent) {
    const marqueeWrapper = marqueeContent.parentElement;
    const marqueeGap = 60; // must match CSS gap

    // Clone items until the strip is wide enough to fill the container seamlessly
    const originalItems = Array.from(marqueeContent.children);
    while (marqueeContent.scrollWidth < marqueeWrapper.offsetWidth) {
        originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            marqueeContent.appendChild(clone);
        });
    }

    let offset = 0;
    const speed = 0.5; // pixels per frame

    function marqueeTick() {
        offset -= speed;
        const first = marqueeContent.firstElementChild;
        const itemWidth = first.offsetWidth + marqueeGap;

        // When the first icon has fully exited on the left, move it to the end
        if (-offset >= itemWidth) {
            offset += itemWidth;
            marqueeContent.appendChild(first);
        }

        marqueeContent.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(marqueeTick);
    }

    requestAnimationFrame(marqueeTick);
}