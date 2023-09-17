const formEl = document.getElementById("formlogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

const submitHandler = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(formEl);
    const form = new URLSearchParams(formData);

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
      error.innerText = " Erreur dans l’identifiant ou le mot de passe";
    }
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener("submit", submitHandler);

// formEl.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = new FormData(formEl);
//   const payload = new URLSearchParams(form);
//   console.log(payload);

//   fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//     },

//     body: payload,
//   })
//     //Récupération de la réponse sous format JSON
//     .then((response) => {
//       // if (!response.ok) {
//       //   throw new Error(`Erreur HTTP : ${response.status}`);
//       // }
//       return response.json();
//     })
//     .then((data) => {
//       if (data.userId == 1) {
//         //Stock le token dans le localStorage
//         localStorage.setItem("token", data.token);
//         location.href = "./index.html";
//       }

//       //Affichage de l'erreur à l'utilisateur
//       else {
//         error.innerText = " Erreur dans l’identifiant ou le mot de passe";
//         document.email.value = null;
//         document.password.value = null;

//         //efface le message
//         function deleteMessage() {
//           error.innerText = "";
//         }
//         setTimeout(deleteMessage, 20000);
//       }
//     })

//     .catch((error) => console.log(error));
// });
