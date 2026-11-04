document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-btn');
  const parallaxElem = document.getElementById('parallax');
  
  // Reset transform when mouse leaves
  document.addEventListener('mouseleave', () => {
    parallaxElem.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
  
  // Form submission with proper data handling
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    let isValid = true;

    // Input validation
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        highlightInvalidInput(input);
      } else {
        removeInvalidHighlight(input);
      }
    });

    if (!isValid) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Collect form data as a regular object (not FormData)
    const formData = {
      name: form.querySelector('input[name="name"]').value.trim(),
      skills: form.querySelector('input[name="skills"]').value.trim(),
      experience: form.querySelector('input[name="experience"]').value.trim(),
      phone: form.querySelector('input[name="phone"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      location: form.querySelector('input[name="location"]').value.trim()
    };

    try {
      // Send as JSON
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showSuccessMessage();
      } else {
        // Try to get error details from response
        const errorData = await response.text();
        console.error('Server response:', errorData);
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please check your network and try again.');
      console.error('Error:', error);
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
  
  // Highlight invalid inputs
  function highlightInvalidInput(input) {
    input.style.borderColor = 'var(--error)';
    input.style.boxShadow = '0 0 0 3px rgba(255, 74, 110, 0.2)';
    
    // Shake animation
    input.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ],
      {
        duration: 400,
        easing: 'ease-in-out'
      }
    );
  }
  
  function removeInvalidHighlight(input) {
    input.style.borderColor = 'var(--glass-border)';
    input.style.boxShadow = 'none';
  }
  
  // Input focus effects
  const inputs = document.querySelectorAll('input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.zIndex = '1';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.zIndex = '0';
    });
  });
  
  // Simulate form submission (in a real app, this would be an API call)
  function simulateFormSubmission() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
});

function showSuccessMessage() {
  const formContainer = document.getElementById('form-container');
  const successContainer = document.getElementById('success-container');
  
  // Hide form with animation
  formContainer.style.opacity = '0';
  formContainer.style.transform = 'translateY(-20px)';
  formContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
  // Show success message
  setTimeout(() => {
    successContainer.classList.add('show');
    createSparkles();
    playSuccessSound();
  }, 500);
}

function playSuccessSound() {
  const successSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
  successSound.volume = 0.5;
  successSound.play().catch(error => {
    console.log('Audio play failed:', error);
  });
}