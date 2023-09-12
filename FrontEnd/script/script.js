// //import { addListenerFilter } from "./filtres.js";

// Récupération des données depuis le backend WORKS

const responseGetWork = await fetch("http://localhost:5678/api/works");
let works = await responseGetWork.json();

// // Récupération des donnés depuis backend CATEGORY

const responseGetCategory = await fetch("http://localhost:5678/api/categories");
const category = await responseGetCategory.json();

// // Fonction qui ajoute les boutons des catégories

function addButtonFilters() {
  const navFiltersElement = document.querySelector(".navfilters");

  const elementButtonAll = document.createElement("button");
  elementButtonAll.textContent = "Tous";
  elementButtonAll.classList.add("btn-filters", "btn-filters__active");
  elementButtonAll.dataset.id = 0;
  navFiltersElement.appendChild(elementButtonAll);

  for (let i = 0; i < category.length; i++) {
    const filtersButton = document.createElement("button");

    filtersButton.classList.add("btn-filters");
    filtersButton.textContent = category[i].name;
    filtersButton.dataset.id = category[i].id;

    navFiltersElement.appendChild(filtersButton);
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
    const IdButton = e.target.getAttribute("data-id");

    filtersElements.forEach((btn) =>
      btn.classList.remove("btn-filters__active")
    );

    e.target.classList.add("btn-filters__active");

    const filteredWork = works.filter(function (work) {
      return IdButton == work.categoryId;
    });
    if (IdButton == 0) {
      generateWork(works);
    } else {
      generateWork(filteredWork);
    }
  })
);
