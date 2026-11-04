<script>
    const referralBtn = document.getElementById("referralBtn");
    const popup = document.getElementById("referralPopup");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.querySelector(".close-btn");
    const submitCode = document.getElementById("submitCode");
    const referralInput = document.getElementById("referralInput");
    const errorMsg = document.getElementById("errorMsg");

    // Open popup
    referralBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.remove("hidden");
        overlay.classList.remove("hidden");
        errorMsg.textContent = "";
        referralInput.value = "";
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    // Submit referral code
    submitCode.addEventListener("click", () => {
        const enteredCode = referralInput.value.trim();
        if (enteredCode === "TX-09A") {
            window.location.href = "/ref.html";
        } else {
            errorMsg.textContent = "❌ Wrong referral code. Try again!";
        }
    });

    // Optional: Close popup when clicking outside
    overlay.addEventListener("click", () => {
        popup.classList.add("hidden");
        overlay.classList.add("hidden");
    });
</script>
