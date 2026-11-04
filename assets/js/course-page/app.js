// DOM Elements
const couponBtn = document.getElementById('coupon-btn');
const couponModal = document.getElementById('coupon-modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.getElementById('overlay');
const couponInput = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon');
const couponMessage = document.getElementById('coupon-message');
const originalPrice = document.getElementById('original-price');
const discountedPrice = document.getElementById('discounted-price');
const enrollBtn = document.getElementById('enroll-btn');

// Constants
const VALID_COUPON = 'TX-HH';

// Functions
function openModal() {
  couponModal.classList.add('active');
  overlay.classList.remove('hidden');
  couponInput.focus();
  
  // Add animation to the modal
  document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
  couponModal.classList.remove('active');
  overlay.classList.add('hidden');
  
  // Reset the form
  couponInput.value = '';
  couponMessage.classList.add('hidden');
  
  document.body.style.overflow = '';
}

function applyCoupon() {
  const couponCode = couponInput.value.trim();
  
  if (!couponCode) {
    showCouponMessage('Please enter a coupon code', 'error');
    return;
  }
  
  if (couponCode === VALID_COUPON) {
    // Success - coupon is valid
    showCouponMessage('Coupon applied successfully!', 'success');
    
    // Update price display
    originalPrice.classList.add('hidden');
    discountedPrice.classList.remove('hidden');
    
    // Disable coupon button
    couponBtn.disabled = true;
    couponBtn.classList.add('disabled');
    
    // Close modal after a delay
    setTimeout(() => {
      closeModalHandler();
    }, 1500);
  } else {
    // Error - invalid coupon
    showCouponMessage('Invalid coupon code. Please try again.', 'error');
  }
}

function showCouponMessage(message, type) {
  couponMessage.textContent = message;
  couponMessage.classList.remove('hidden', 'success', 'error');
  couponMessage.classList.add(type);
}

function handleEnrollClick() {
  // In a real application, this would redirect to checkout or registration
  alert('Thank you for your interest! This would redirect to the checkout process in a real application.');
}

// Event Listeners
couponBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
overlay.addEventListener('click', closeModalHandler);
applyCouponBtn.addEventListener('click', applyCoupon);
enrollBtn.addEventListener('click', handleEnrollClick);

// Handle Enter key in coupon input
couponInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    applyCoupon();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && couponModal.classList.contains('active')) {
    closeModalHandler();
  }
});

// Add some interactivity to course elements
document.querySelectorAll('.learning-item').forEach((item, index) => {
  // Add a slight delay to each item for a staggered effect
  item.style.animationDelay = `${index * 0.1}s`;
  item.classList.add('fade-in');
});

// Add a class for initial animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});