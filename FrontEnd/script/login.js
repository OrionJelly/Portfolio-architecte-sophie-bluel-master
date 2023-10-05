/*********************************************************************************
**********************************************************************************
***********************    PROCEDURE GLOBALE    **********************************
==> Déclaration des constantes
==> Suppression comportement par defaut du bouton submit
==> Vérification de la validité des données du formulaire 
==> Envoi du formulaire de connection + Récupération de la réponse du serveur
==> Sauvegarde de l'userId et du token d'authentification  dans le localstorage
==> Redirection vers la page d'accueil
********************************************************************************** 
**********************************************************************************/

/****  Déclaration des constantes  ****/
const formEl = document.getElementById("formlogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");
const submitButton = document.querySelector(".btn-connexion");
submitButton.classList.add("btn-connexion__hidden");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

/**** Fonction qui permet envoi du formulaire et récupération de la réponse serveur ****/

async function submitHandler(e) {
  e.preventDefault();
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
      localStorage.setItem("userId", data.userId);
      location.href = "./index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

/**** Fonctions qui permettent la vérification des données du formulaire
 ****/

function verifyEmail() {
  emailInput.classList.remove("regex-valid", "login-input-focus");
  if (
    emailInput.value.match(
      /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
    )
  ) {
    emailInput.classList.add("regex-valid", "login-input-focus");

    return true;
  } else {
    return false;
  }
}

function verifyPassword() {
  passwordInput.classList.remove("regex-valid", "login-input-focus");
  if (passwordInput.value.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,}$/)) {
    passwordInput.classList.add("regex-valid", "login-input-focus");
    return true;
  } else {
    return false;
  }
}

/****Initialisation de la phase de connection ****/

formEl.addEventListener("input", () => {
  verifyEmail();
  verifyPassword();
  if (verifyEmail() === true && verifyPassword() === true) {
    submitButton.classList.remove("btn-connexion__hidden");
    error.innerText = "";
    formEl.addEventListener("submit", submitHandler);
  } else {
    submitButton.classList.add("btn-connexion__hidden");

    error.innerText = "Veuillez renseigner les champs correctement";
  }
});

/**** Fin de la phase de connection ****/
