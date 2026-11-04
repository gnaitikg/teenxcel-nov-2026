// Particles effect for background
class Particle {
    constructor(x, y, size, speed) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
      this.element = document.createElement('div');
      this.element.classList.add('particle');
      this.element.style.width = `${this.size}px`;
      this.element.style.height = `${this.size}px`;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.element.style.opacity = Math.random() * 0.5 + 0.1;
      document.getElementById('particles').appendChild(this.element);
    }
  
    update() {
      this.y += this.speed;
      if (this.y > window.innerHeight) {
        this.y = -this.size;
        this.x = Math.random() * window.innerWidth;
      }
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }
  
  // Initialize particles
  function initParticles() {
    const particles = [];
    const particlesContainer = document.getElementById('particles');
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles based on screen size
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speed = Math.random() * 0.5 + 0.1;
      
      particles.push(new Particle(x, y, size, speed));
    }
    
    // Animation loop
    function animate() {
      particles.forEach(particle => particle.update());
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Create 3D waves
  function createWaves() {
    const container = document.querySelector('.wave-container');
    const waveCount = 5;
    
    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.animationDelay = `${-i * 4}s`;
      container.appendChild(wave);
    }
  }
  
  // Text animation with typewriter effect
  function animateText() {
    const text = document.getElementById('coming-soon-text');
    text.style.opacity = '1';
  }
  
  // Mouse movement effect
  function initMouseEffect() {
    document.addEventListener('mousemove', (e) => {
      const waves = document.querySelectorAll('.wave');
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      waves.forEach((wave, index) => {
        const depth = (index + 1) * 0.1;
        wave.style.transform = `perspective(1000px) rotateX(${60 + mouseY * depth}deg) rotateY(${mouseX * depth}deg) rotateZ(${index * 72}deg)`;
      });
    });
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    createWaves();
    animateText();
    initMouseEffect();
    
    // Re-initialize particles on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initParticles();
      }, 300);
    });
  });