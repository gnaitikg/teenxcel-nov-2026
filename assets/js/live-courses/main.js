// Back button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    
    if (backButton) {
      backButton.addEventListener('click', function() {
        // Navigate back in history or to a specific page
        // For now, we'll just go back in browser history
        history.back();
      });
    }
    
    // Download brochure functionality
    const downloadButton = document.querySelector('.download-button');
    
    if (downloadButton) {
      downloadButton.addEventListener('click', function() {
        // In a real-world scenario, this would download an actual file
        // For this demo, we'll create a simulated download experience
        
        // Change button text to show loading
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading...</span>';
        
        // Simulate download delay
        setTimeout(() => {
          // Create an anchor element for download
          const link = document.createElement('a');
          // In a real app, this would be a path to an actual PDF file
          link.href = '#';
          link.download = 'course-brochure.pdf';
          
          // Reset button
          this.innerHTML = originalText;
          
          // Show success message
          showNotification('Brochure downloaded successfully!');
          
          // In a real scenario, we would trigger the download here
          // For demo purposes, we'll just show the notification
        }, 1500);
      });
    }
    
    // Enroll button functionality
    const enrollButtons = document.querySelectorAll('.enroll-button, .cta-button');
    
    enrollButtons.forEach(button => {
      button.addEventListener('click', function() {
        // In a real application, this would redirect to checkout or show a modal
        showNotification('Enrollment functionality would be implemented here!');
      });
    });
    
    // Initialize the benefit cards with animation indices
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
      card.style.setProperty('--index', index + 1);
    });
  });
  
  // Notification system
  function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
      
      // Add styles to the notification
      Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      });
    }
    
    // Set the message
    notification.textContent = message;
    
    // Show the notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
    }, 3000);
  }