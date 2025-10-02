// LOGIN
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    fetch("/utilisateurs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: password })
    })
    .then(res => res.json())
    .then(data => {
    if(data.success){
        window.location.href = "/dashboard.html"; // redirection
    } else {
        loginError.textContent = data.message || "Erreur de connexion";
    }
    })
    .catch(err => console.error(err));
});

// SIGNUP
const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");

signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const nom = document.getElementById("signupNom").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const mot_de_passe = document.getElementById("signupPassword").value.trim();
    const role = document.getElementById("signupRole").value;

    fetch("/utilisateurs/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, mot_de_passe, role })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error || data.message){
            signupError.textContent = data.message || data.error;
        } else {
            alert("Compte créé ! Connectez-vous.");
            window.location.reload();
        }
    })
    .catch(err => console.error(err));
});