function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles-container');
    const numSparkles = 50;
    
    for (let i = 0; i < numSparkles; i++) {
      setTimeout(() => {
        createSparkle(sparklesContainer);
      }, i * 50);
    }
  }
  
  function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 30 + 10;
    
    // Random color
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#8A2BE2', '#00BFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set styles
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    // Create SVG sparkle (for better appearance)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 0L14.59 8.41 23 11 14.59 13.59 12 22 9.41 13.59 1 11 9.41 8.41z');
    path.setAttribute('fill', color);
    
    svg.appendChild(path);
    sparkle.appendChild(svg);
    
    // Add to container
    container.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
  
  // Multiple confetti explosion on success
  function explodeConfetti() {
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#8A2BE2', '#00BFFF', '#FF1493'];
    const numConfetti = 100;
    
    for (let i = 0; i < numConfetti; i++) {
      // Create confetti piece
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random position, centered around success checkmark
      const successMessage = document.querySelector('.success-message');
      const rect = successMessage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Random angle and distance from center
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Random size
      const size = Math.random() * 10 + 5;
      
      // Random rotation
      const rotation = Math.random() * 360;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set styles
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.transform = `rotate(${rotation}deg)`;
      
      // Add to container
      document.getElementById('sparkles-container').appendChild(confetti);
      
      // Animate
      const destinationX = x + (Math.random() - 0.5) * 200;
      const destinationY = y + Math.random() * 200;
      const duration = Math.random() * 1000 + 1000;
      
      confetti.animate(
        [
          { transform: `translate(0, 0) rotate(${rotation}deg)`, opacity: 1 },
          { transform: `translate(${destinationX - x}px, ${destinationY - y}px) rotate(${rotation + 360}deg)`, opacity: 0 }
        ],
        {
          duration: duration,
          easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
          fill: 'forwards'
        }
      );
      
      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, duration);
    }
  }
  
  // Add confetti explosion on success message display
  document.addEventListener('DOMContentLoaded', () => {
    const successContainer = document.getElementById('success-container');
    
    // Watch for when success container becomes visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('show')) {
          setTimeout(explodeConfetti, 300);
        }
      });
    });
    
    observer.observe(successContainer, { attributes: true, attributeFilter: ['class'] });
  });