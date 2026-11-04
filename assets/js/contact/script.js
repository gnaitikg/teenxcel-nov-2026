document.addEventListener('DOMContentLoaded', function() {
    // Email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Thank you for your message! We will get back to you soon.');
        });
    }

    // Seminar form submission
    const seminarForm = document.getElementById('seminar-form');
    if (seminarForm) {
        seminarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Your seminar request has been received! We will contact you shortly to discuss details.');
        });
    }

    // Handle form submission with animation and success message
    function handleFormSubmission(form, successMessage) {
        // Validate form
        if (!validateForm(form)) {
            animateFormError(form);
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual submission code)
        setTimeout(() => {
            // Show success animation
            form.classList.add('form-success', 'show');
            
            // Reset form after delay
            setTimeout(() => {
                showNotification(successMessage, 'success');
                form.reset();
                form.classList.remove('form-success', 'show');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        }, 1500);
    }

    // Form validation
    function validateForm(form) {
        let valid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                highlightInvalidField(input);
                valid = false;
            } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                highlightInvalidField(input);
                valid = false;
            }
        });
        
        return valid;
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Highlight invalid fields
    function highlightInvalidField(field) {
        field.style.borderColor = 'var(--error-color)';
        field.classList.add('shake');
        
        // Remove error styling after animation completes
        setTimeout(() => {
            field.classList.remove('shake');
        }, 500);
        
        // Remove error styling when user starts typing again
        field.addEventListener('input', function onInput() {
            field.style.borderColor = '';
            field.removeEventListener('input', onInput);
        });
    }

    // Animate form error
    function animateFormError(form) {
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: type === 'success' ? 'var(--success-color)' : 'var(--error-color)',
            color: 'white',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.3s, transform 0.3s'
        });
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide and remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Whatsapp button special hover effect
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fab fa-whatsapp"></i> Let\'s Talk!';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.innerHTML = '<i class="fab fa-whatsapp"></i> Chat Now';
        });
    }
});