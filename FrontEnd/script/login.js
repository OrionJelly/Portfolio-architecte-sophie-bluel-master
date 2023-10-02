const formEl = document.getElementById("formlogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

// const submitHandler = async (e) => {
//   try {
//     e.preventDefault();
//     const formData = new FormData(formEl);
//     const form = new URLSearchParams(formData);

//     const res = await fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//       },
//       body: form,
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.userId);
//       location.href = "./index.html";
//     } else {
//       error.innerText = " Erreur dans l’identifiant ou le mot de passe";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// formEl.addEventListener("submit", submitHandler);

formEl.addEventListener("submit", async function submitHandler(e) {
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
});
