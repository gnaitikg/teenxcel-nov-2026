document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const successMessage = document.getElementById('success-message');

  // 3D card effect
  document.addEventListener('mousemove', (e) => {
    if (!card) return;
    
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(10px)
    `;
  });

  // Reset card position
  document.addEventListener('mouseleave', () => {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });

  // Close success message on click
  successMessage.addEventListener('click', () => {
    successMessage.classList.remove('visible');
    // Show the form again
    document.getElementById('app').style.display = 'block';
    setTimeout(() => successMessage.classList.add('hidden'), 500);
  });
});

// Create sparkle effect
function createSparkles() {
  const container = document.getElementById('sparkle-container');
  const sparkleCount = 50;
  
  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      
      const left = Math.random() * 100;
      sparkle.style.left = `${left}%`;
      sparkle.style.top = '0';
      
      const size = Math.random() * 8 + 2;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      const duration = Math.random() * 2 + 2;
      
      container.appendChild(sparkle);
      
      requestAnimationFrame(() => {
        sparkle.style.opacity = '0.8';
        sparkle.style.transform = `translateY(${Math.random() * 100 + 100}%)`;
        sparkle.style.transition = `all ${duration}s cubic-bezier(0.645, 0.045, 0.355, 1)`;
        
        setTimeout(() => {
          sparkle.style.opacity = '0';
          setTimeout(() => sparkle.remove(), 1000);
        }, duration * 1000);
      });
    }, i * 50);
  }
}

// Single form submission handler
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('number').value;
  const school = document.getElementById('school').value;
  const sem = document.getElementById('sem').value;

  const payload = { name, phone, school, sem };

  const button = document.getElementById('submit-button');
  const buttonText = button.querySelector('.button-text');
  const buttonLoader = button.querySelector('.button-loader');

  // Add loading state
  button.classList.add('loading');
  buttonText.style.display = 'none';
  buttonLoader.style.display = 'inline-block';

  try {
    const response = await fetch('https://teenxcel-production.up.railway.app/api/contact/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log(response);
    
    if (response.status === 200) {
      console.log("request sent");
      
      // Hide the form
      document.getElementById('app').style.display = 'none';
      
      // Show success message
      const successMessage = document.getElementById('success-message');
      successMessage.classList.remove('hidden');
      successMessage.classList.add('visible');
      
      // Create sparkle effect
      createSparkles();
      
      // Reset form for future use
      this.reset();
    } else {
      alert("Failed to submit form. Please try again.");
    }
  } catch (err) {
    console.error('Error:', err);
    alert("Error submitting form: " + err.message);
  } finally {
    // Remove loading state
    button.classList.remove('loading');
    buttonText.style.display = 'inline-block';
    buttonLoader.style.display = 'none';
  }
});