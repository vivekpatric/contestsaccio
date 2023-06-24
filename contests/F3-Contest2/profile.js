document.getElementById("logoutButton").addEventListener("click", function () {
    // Clear user state from local storage
    localStorage.removeItem("userState");

    // Redirect to signup page
    window.location.href = "index.html";
    });

// Check user state on page load
document.addEventListener("DOMContentLoaded", function () {
    const userState = JSON.parse(localStorage.getItem("userState"));

    if (!userState || !userState.accessToken) {
    // Redirect to signup page if access token is missing
    window.location.href = "index.html";
    } 
    else {
    // Display user details
        const profileDetailsElement = document.getElementById("profileDetails");
        profileDetailsElement.innerHTML = `<p class="answer"><strong id="profilehead">Full Name :</strong> ${userState.name}</p>
        <p class="answer"><strong id="profilehead">Email :</strong> ${userState.email}</p>
        <p class="answer"><strong id="profilehead">Password :</strong> ${userState.password}</p>`;
    }
});

// locking to move next page
document.addEventListener("DOMContentLoaded", function() {
    const userState = JSON.parse(localStorage.getItem("userState"));
    const currentPath = window.location.pathname;
  
    if (currentPath.includes("profile.html")) {
        if (!userState || !userState.accessToken) {
            window.location.href = "index.html";
        }
    } else if (currentPath.includes("index.html")) {
        if (userState && userState.accessToken) {
            window.location.href = "profile.html";
        }
    }
  });