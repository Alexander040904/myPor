'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const projectItem = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImageBox = document.querySelector("[data-modal-img-box]");

// modal variable
const modal = document.querySelector("[data-modal]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// -----------------------------
// SISTEMA NUEVO PARA LOS LINKS
// -----------------------------
let currentModalLinks = null;

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// -----------------------------
// TESTIMONIALS MODAL
// -----------------------------
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {
    modal.classList.remove("project-modal");
    modal.classList.add("testimonials-modal");
    modalImageBox.classList.remove("modal-project-box");
    modalImageBox.classList.add("modal-avatar-box");

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;

    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // Ocultar links si el modal anterior era de proyecto
    if (currentModalLinks) {
      currentModalLinks.remove();
      currentModalLinks = null;
    }

    testimonialsModalFunc();
  });

}

// -----------------------------
// PROJECTS MODAL (CORREGIDO)
// -----------------------------
for (let i = 0; i < projectItem.length; i++) {

  projectItem[i].addEventListener("click", function (e)  {

    e.preventDefault(); // evita que el <a> abra otra página

    const item = this.closest("[data-project-item]");

    // -----------------------------
    // LIMPIAR LINKS ANTERIORES
    // -----------------------------
    if (currentModalLinks) {
      currentModalLinks.remove();
      currentModalLinks = null;
    }

    // -----------------------------
    // OBTENER LINKS DEL ITEM
    // -----------------------------
    const originalLinks = item.querySelector("[data-modal-link]");

    if (originalLinks) {
      currentModalLinks = originalLinks.cloneNode(true);
      currentModalLinks.classList.add("active"); // aplicar display:flex

      // Inserta los links en el modal, al final del texto
      modalText.appendChild(currentModalLinks);

      // Actualiza los href si existen en los data-attributes
    
    }

    // -----------------------------
    // CONFIGURAR MODAL DE PROYECTO
    // -----------------------------
    modal.classList.remove("testimonials-modal");
    modal.classList.add("project-modal");

    modalImageBox.classList.remove("modal-avatar-box");
    modalImageBox.classList.add("modal-project-box");

    modalImg.src = item.querySelector("[data-project-picture]").src;
    modalImg.alt = item.querySelector("[data-project-picture]").alt;

    modalTitle.innerHTML = item.querySelector("[data-project-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-project-text]").innerHTML;

    // Volver a meter los links después del texto
    if (currentModalLinks) modalText.appendChild(currentModalLinks);

    testimonialsModalFunc();
  });
}

// -----------------------------
// CERRAR MODAL
// -----------------------------
modalCloseBtn.addEventListener("click", function () {
  if (currentModalLinks) {
    currentModalLinks.remove();
    currentModalLinks = null;
  }
  testimonialsModalFunc();
});

overlay.addEventListener("click", function () {
  if (currentModalLinks) {
    currentModalLinks.remove();
    currentModalLinks = null;
  }
  testimonialsModalFunc();
});

// -----------------------------
// CUSTOM SELECT
// -----------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// -----------------------------
// FILTRO DE PROYECTOS
// -----------------------------
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    }else if (selectedValue === filterItems[i].dataset.category.toLowerCase())
 {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });
}

// -----------------------------
// FORM VALIDATION
// -----------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// -----------------------------
// PAGE NAVIGATION
// -----------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toUpperCase() === pages[i].dataset.page.toUpperCase()) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
