document.getElementById('openPopup').onclick = function() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

document.getElementById('closePopup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('submitCode').onclick = function() {
    var code = document.getElementById('referralCode').value;
    if (code === "TX-987") {
        window.location.href = "ref.html"; // Redirect to ref.html
    } else {
        alert("Invalid referral code. Please try again.");
    }
}
