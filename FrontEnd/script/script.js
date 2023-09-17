// Récupération depuis le localstorage
let works = window.localStorage.getItem("works");
let category = window.localStorage.getItem("category");
let token = window.localStorage.getItem("token");
// Récupération des données depuis le backend WORKS & CATEGORY
if (works === null || category === null) {
  const responseGetWork = await fetch("http://localhost:5678/api/works");
  const responseGetCategory = await fetch(
    "http://localhost:5678/api/categories"
  );
  works = await responseGetWork.json();
  category = await responseGetCategory.json();

  const valueWorks = JSON.stringify(works);
  const valueCategory = JSON.stringify(category);
  //Stockage dans le localstorage
  window.localStorage.setItem("works", valueWorks);
  window.localStorage.setItem("category", valueCategory);
} else {
  works = JSON.parse(works);
  category = JSON.parse(category);
}

// // Fonction qui ajoute les boutons des catégories

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
}

// Fonction génère gallery selon le tableau

function generateWork(array) {
  const elementDivGallery = document.querySelector(".gallery");
  elementDivGallery.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    elementDivGallery.innerHTML += `
         <figure>
         <img src="${array[i].imageUrl}" 
         alt="${array[i].title}">
         <figcaption>${array[i].title}</figcaption>
         </figure>
         `;
  }
}

generateWork(works);
addButtonFilters();

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

// Test pour la version Admin

function menuAdmin() {
  const headerEl = document.getElementsByTagName("header");
  const navAdminEl = document.createElement("div");

  navAdminEl.textContent = "Test";
  headerEl[0].appendChild(navAdminEl);
}

if (token === null) {
  console.log("Il y a pas de token");
} else {
  menuAdmin();
}
