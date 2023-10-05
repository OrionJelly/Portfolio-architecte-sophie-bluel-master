const editMod = document.querySelector(".edit-mod__container");
const dialogEl = document.querySelector("#modal");
const loginEl = document.querySelector(".login");
const logoutEl = document.querySelector(".logout");
const mainModalFramEl = document.querySelector(".modal-main");
const addPicturesModalFramEl = document.querySelector(".modal-add-pictures");
const addPicturesEl = document.querySelectorAll(".btn-add-pictures");
const returnBtnEl = document.querySelector(".return-modal-btn");
const openModalEl = document.querySelectorAll(".open-modal-btn");
const closeModalEl = document.querySelectorAll(".close-modal-btn");
const formAddPicture = document.querySelector("#form-add-pictures");

const inputTitle = document.querySelector("#title");
const inputCategory = document.getElementById("select-category");
const addPictureLabel = document.querySelector(".add-pictures__label");
const submitPictureBtn = document.querySelector(
  ".btn-add-pictures.btn-validation"
);
const imagePreview = document.createElement("img");
const clearBG = document.querySelector(".add-pictures__placeholder");
const userInfo = document.querySelector(".form-add-pictures-error");
const regexNoBlank = /^\s*\S+.*/;
// Récupération depuis le localstorage
let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

// Récupération des données depuis le backend WORKS & CATEGORY
let works;
let category;
const responseGetWork = await fetch("http://localhost:5678/api/works");
const responseGetCategory = await fetch("http://localhost:5678/api/categories");
works = await responseGetWork.json();
category = await responseGetCategory.json();

// Fonction qui ajoute les boutons des catégories
function addButtonFilters() {
  const navFiltersEl = document.querySelector(".navfilters");

  const elementButtonAll = document.createElement("button");
  elementButtonAll.textContent = "Tous";
  elementButtonAll.classList.add("btn-filters", "btn-filters__active");
  elementButtonAll.dataset.id = 0;
  navFiltersEl.appendChild(elementButtonAll);

  for (let i = 0; i < category.length; i++) {
    const filtersButton = document.createElement("button");

    filtersButton.classList.add("btn-filters");
    filtersButton.textContent = category[i].name;
    filtersButton.dataset.id = category[i].id;

    navFiltersEl.appendChild(filtersButton);
  }
  addFiltersToButtonFilters();
}
// Fonction génère gallery selon le tableau
const elementDivGallery = document.querySelector(".gallery");
function generateWork(array) {
  elementDivGallery.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    elementDivGallery.innerHTML += `
         <figure data-id="${array[i].id}" class="picture">
         <img src="${array[i].imageUrl}" 
         alt="${array[i].title}">
         <figcaption>${array[i].title}</figcaption>
         </figure>
         `;
  }
}

// Fonction qui tri les images selon leur catégorie
function addFiltersToButtonFilters() {
  const filtersElements = document.querySelectorAll(".btn-filters");

  filtersElements.forEach((button) =>
    button.addEventListener("click", (e) => {
      const idButton = e.target.getAttribute("data-id");

      filtersElements.forEach((btn) =>
        btn.classList.remove("btn-filters__active")
      );

      e.target.classList.add("btn-filters__active");

      const filteredWork = works.filter(function (work) {
        return idButton == work.categoryId;
      });
      if (idButton == 0) {
        generateWork(works);
      } else {
        generateWork(filteredWork);
      }
    })
  );
}

addButtonFilters();
generateWork(works);
// Test pour la version Admin

// Basculement entre les modales

function menuAdmin() {
  // Gestion du bouton login
  const inputFile = document.querySelector("#file");
  loginEl.style.display = "none";
  logoutEl.style.display = "flex";

  logoutEl.addEventListener("click", () => {
    localStorage.clear();
    location.href = "./index.html";
  });

  // Appariton du mode Edition

  editMod.style.display = "flex";

  openModalEl.forEach((item) => {
    item.style.display = "flex";
  });

  openModalEl.forEach((button) =>
    button.addEventListener("click", () => {
      dialogEl.showModal();

      mainModalFramEl.style.display = "flex";
      addPicturesModalFramEl.style.display = "none";
    })
  );

  closeModalEl.forEach((button) =>
    button.addEventListener("click", () => {
      formAddPicture.reset();
      imagePreview.remove();
      clearBG.style.display = "flex";
      submitPictureBtn.classList.add("btn-form-incomplete");
      userInfo.innerText = "";
      fileObject = "";
      dialogEl.close();
    })
  );

  // Fermer la modale au click extérieure
  document.addEventListener("click", function (event) {
    if (event.target == dialogEl) {
      formAddPicture.reset();
      imagePreview.remove();
      clearBG.style.display = "flex";
      submitPictureBtn.classList.add("btn-form-incomplete");
      userInfo.innerText = "";
      fileObject = "";
      dialogEl.close();
    }
  });

  addPicturesEl[0].addEventListener("click", () => {
    mainModalFramEl.style.display = "none";
    addPicturesModalFramEl.style.display = "flex";
  });

  returnBtnEl.addEventListener("click", () => {
    mainModalFramEl.style.display = "flex";
    addPicturesModalFramEl.style.display = "none";
    imagePreview.remove();
    clearBG.style.display = "flex";
    formAddPicture.reset();
    clearBG.style.display = "flex";
    userInfo.innerText = "";
    submitPictureBtn.classList.add("btn-form-incomplete");
    fileObject = "";
  });

  generateWorkAdmin(works);
}

// Vérification de la présence du token et de l'id de l'utilisateur puis accès au mode administrateur si la vérification est validée
if (token === null || userId == false) {
  console.log("Il y a pas de token");
} else {
  menuAdmin();
}

// Génération de la galerie pour la modale admin
function generateWorkAdmin(array) {
  const elementDivGalleryModal = document.querySelector(".gallery-modal");
  elementDivGalleryModal.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    elementDivGalleryModal.innerHTML += `
         <figure data-id="${array[i].id}" class="gallery-pictures">
         <img  src="${array[i].imageUrl}" 
         alt="${array[i].title}">
         <i data-id="${array[i].id}" class="fa-solid fa-trash-can"></i>    
         </figure>
         `;
  }
}

//Fonction de suppression de projet
const trashEl = document.querySelectorAll(".fa-trash-can");
const trashIcon = document.querySelector(".fa-trash-can");

dialogEl.addEventListener("click", function deleteWork(e) {
  if (e.target.classList.contains("fa-trash-can")) {
    console.log(e.target);
    const id = e.target.getAttribute("data-id");
    if (window.confirm("Souhaitez-vous supprimer ce projet ?")) {
      submitDeleteWork(id, e);
    }
  }
});

async function submitDeleteWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const pictureAdmin = document.querySelector(
        `.gallery-pictures[data-id="${id}"]`
      );
      const picture = document.querySelector(`.picture[data-id="${id}"]`);
      pictureAdmin.remove();
      picture.remove();
      alert("Projet supprimmé avec succès !!");
    }
  } catch (error) {
    alert("Un problème est survenu, veuillez réssayer.");
    console.log(error);
  }
}

// Section formulaire ajout de photos

const inputFile = document.querySelector("#file");
let file = 0;
let fileObject;
// Preview de la nouvelle photo
inputFile.addEventListener("change", () => {
  userInfo.innerText = "";
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    const allImg = addPictureLabel.querySelectorAll("img");
    allImg.forEach((image) => image.remove());
    addPictureLabel.appendChild(imagePreview);
    clearBG.style.display = "none";
    imagePreview.classList.add("preview");
    imagePreview.src = reader.result;
  });
  reader.readAsDataURL(inputFile.files[0]);
  console.log("Dans le reader " + file);
  fileObject = inputFile.files[0];
});

formAddPicture.addEventListener("change", () => {
  if (validateForm()) {
    submitPictureBtn.classList.remove("btn-form-incomplete");
    userInfo.innerText = "";
  } else {
    submitPictureBtn.classList.add("btn-form-incomplete");
  }
});

formAddPicture.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm()) {
    submitNewPicture();
    alert("Nouveau projet ajouté avec succès !!");
    submitPictureBtn.classList.add("btn-form-incomplete");
    fileObject = "";
  }
});

// Fonction aui vérifie si l input file est vide

function isFileEmpty() {
  if (fileObject !== undefined) {
    file = fileObject;
    return file;
  }
}
// // Fonction vérification remplissage formulaire d'envoi d'une nouvelle image

function validateForm() {
  isFileEmpty();
  console.log("validateform " + file);
  console.log(fileObject);
  console.log("log de la fonction " + isFileEmpty());
  userInfo.innerText = "";
  const supportedFormat = ["image/jpeg", "image/jpg", "image/png"];
  const limit = 4;
  const size = file.size / 1000000;
  if (!file) {
    const error = "Veuillez sélectionner une image.";
    userInfo.innerText = error;
    return false;
  } else if (size > limit) {
    const error = `La taille de l'image ${size} MB, est trop volumineuse`;
    userInfo.innerText = error;
    return false;
  } else if (!inputTitle.value.match(regexNoBlank)) {
    const error = "Veuillez entrer un titre valide";
    userInfo.innerText = error;
    return false;
  } else if (inputCategory.value === "empty") {
    const error = "Veuillez choisir une catégorie";
    userInfo.innerText = error;
    return false;
  } else if (!supportedFormat.includes(file.type)) {
    const error = "Veuillez choisir un format d'image valide : jpeg/jpg/png";
    userInfo.innerText = error;
    return false;
  } else {
    submitPictureBtn.classList.remove("btn-form-incomplete");
    return true;
  }
}

// Requete fetch
async function submitNewPicture() {
  const formData = new FormData(formAddPicture);
  console.log(formData);
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      works.push(data);
      generateWork(works);
      generateWorkAdmin(works);
      formAddPicture.reset();
      imagePreview.remove();
      clearBG.style.display = "flex";
    }
  } catch (error) {
    console.log(error);
  }
}

//EventListener pour prévenir le comportement par defaut du bouton submit

const formContact = document.querySelector("#form-contact");

formContact.addEventListener("submit", (e) => {
  e.preventDefault();
});
