/*********************************************************************************
**********************************************************************************
***********************    PROCEDURE GLOBALE    **********************************
==> Déclaration des constantes
==> Suppression comportement par defaut du bouton submit
==> Envoi du formulaire de connection + Récupération de la réponse du serveur
==> Sauvegarde du token d'authentification  dans le localstorage
==> Redirection vers la page d'accueil
**********************************************************************************
**********************************************************************************/

/****  Déclaration des constantes  ****/
const formEl = document.getElementById("formlogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");
const submitButton = document.querySelector(".btn-connexion");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  submitHandler();
});

/**** Fonction qui permet envoi du formulaire et récupération de la réponse serveur ****/

async function submitHandler() {
  const formData = new FormData(formEl);
  const form = new URLSearchParams(formData);
  try {
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: form,
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      location.href = "./index.html";
    } else {
      error.innerText = "";
      error.innerText = "Erreur dans l’identifiant ou le mot de passe";
    }
  } catch (error) {
    console.log(error);
  }
}
