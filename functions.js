// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add some particle effects on hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#00d4ff';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.opacity = '0.8';
    particle.style.animation = 'particleFloat 8s linear forwards';

    document.querySelector('.hero').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 2000);

document.querySelector('.btn-secondary').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('popup-contact').style.display = 'flex';
});

// Cerrar popup
function closePopup() {
    document.getElementById('popup-contact').style.display = 'none';
}

// Enviar formulario usando FormSubmit
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    // Deshabilitar botón y mostrar feedback
    submitButton.disabled = true;
    submitButton.innerText = 'Enviando...';

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/xzzvkelj', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            status.innerText = "✅ ¡Gracias por tu mensaje!";
            form.reset();
            // Opcional: cerrar el popup automáticamente
            setTimeout(() => {
                closePopup();
                status.innerText = "";
            }, 4000);
        } else {
            status.innerText = "❌ Error al enviar. Intenta nuevamente.";
            submitButton.disabled = false;
            submitButton.innerText = 'Enviar';
        }
    } catch (error) {
        status.innerText = "❌ Error de red. Intenta más tarde.";
        submitButton.disabled = false;
        submitButton.innerText = 'Enviar';
    }
});

document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('popup-demo').style.display = 'flex';
});

// Cerrar popup demo
function closeDemoPopup() {
    document.getElementById('popup-demo').style.display = 'none';
}

// Enviar formulario de demo
document.getElementById('demo-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById('demo-status');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    const originalText = submitButton.innerText;
    submitButton.innerText = 'Enviando...';

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/xzzvkelj', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            status.innerText = "✅ ¡Gracias por solicitar la demo!";
            form.reset();
            setTimeout(() => {
                closeDemoPopup();
                status.innerText = "";
                submitButton.innerText = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            status.innerText = "❌ Error al enviar. Intenta nuevamente.";
            submitButton.disabled = false;
            submitButton.innerText = originalText;
        }
    } catch (err) {
        status.innerText = "❌ Error de red. Intenta más tarde.";
        submitButton.disabled = false;
        submitButton.innerText = originalText;
    }
});