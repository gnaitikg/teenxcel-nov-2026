document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.querySelector('.particles');
    const maxParticles = 100;
    
    // Create particles
    for (let i = 0; i < maxParticles; i++) {
      createParticle();
    }
    
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 3 + 1;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Random duration
      const duration = Math.random() * 20 + 10;
      
      // Random delay
      const delay = Math.random() * 10;
      
      // Set styles
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.animation = `particle-animation ${duration}s infinite`;
      particle.style.animationDelay = `${delay}s`;
      
      // Add to container
      particlesContainer.appendChild(particle);
      
      // Remove and recreate particle after duration
      setTimeout(() => {
        particle.remove();
        createParticle();
      }, duration * 1000);
    }
    
    // Add subtle floating animation to form
    const formWrapper = document.querySelector('.form-wrapper');
    formWrapper.style.animation = 'float 6s ease-in-out infinite';
  });