document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve user details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;

    // Generate access token
    const accessToken = generateAccessToken();

    // Create user state
    const userState = {
      name: name,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      accessToken: accessToken,
    };

    // Store user state in local storage
    localStorage.setItem("userState", JSON.stringify(userState));    
});

// generate token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Display success message
function showMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;

  if (name === "" || email === "" || password === "" || confirmpassword === "") {
    document.getElementById("errorMessage").textContent = "Error: All the fields are mandatory!";
    document.getElementById("successMessage").textContent = "";
    document.getElementById("passwordMessage").textContent = "";
  } 
  else{
    if(password !== confirmpassword){
      document.getElementById("errorMessage").textContent = "";
      document.getElementById("successMessage").textContent = "";
      document.getElementById("passwordMessage").textContent = "Your password doesn't matched!";
    }
    else{
        document.getElementById("errorMessage").textContent = "";
        document.getElementById("successMessage").textContent = "Successfully Signed up!";
        document.getElementById("passwordMessage").textContent = "";

        // Redirect to profile page
        setTimeout(function () {
          window.location.href = "profile.html";
        }, 2000);
    }
  }
}

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