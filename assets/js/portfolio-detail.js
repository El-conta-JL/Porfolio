import Repository from "../data/repository.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const ROUTE_IMG = "assets/img/portfolio-details/projects/";

const repo = new Repository();
const swipeWrapper = document.querySelector("#swiper-wrapper");
const detailsDOM = document.querySelector("#details");
let indexFromProjects = -1;

repo.getProjects().some((project, index) => {
  if (project.name.toLowerCase() == urlParams.get("name").toLowerCase()) {
    indexFromProjects = index;
  }
});

if (indexFromProjects === -1) {
  window.location.replace("404.html");
}

const data = repo.getProjects()[indexFromProjects];

const details = {
  cat: data.details.category,
  client: data.details.client,
  date: data.details.date,
  url: data.details.url,
  title: data.details.title,
  desc: data.details.desc,
  carrusel: data.details.carruselImages,
  filter: data.details.filter,
  github: data.details.github,
};

if (details.url) {
  const ancla = document.querySelector("#url-proyect").lastChild;
  ancla.setAttribute("href", details.url);
  ancla.textContent = details.url;
} else {
  document.querySelector("#url-proyect").style.display = "none";
}

detailsDOM.childNodes.forEach((node) => {
  Object.keys(details).forEach((key) => {
    if (node.textContent.toString().includes(`{{${key}}}`)) {
      node.textContent = node.textContent.replace(`{{${key}}}`, details[key]);
    }
  });
});

detailsDOM.childNodes.forEach((node) => {
  if (node.textContent.includes("{{")) {
    node.style.display = "none";
  }
});

if (details.github) {
  const liGithub = document.createElement("li");
  liGithub.innerHTML = `<strong>Github</strong>: <a target="_blank" href="${details.github}">Proyect in Github.</a>`;
  detailsDOM.appendChild(liGithub);
}

document.querySelector("#title-detail").textContent = details.title;
document.querySelector("#desc-detail").textContent = details.desc;

details.carrusel.forEach((image) => {
  buildSwiper(image, details.filter);
});

/**
 * Portfolio details slider
 */
new Swiper(".portfolio-details-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

function buildSwiper(data, filter) {
  const swiper = document.createElement("div");
  swiper.classList.add("swiper-slide");
  const image = document.createElement("img");
  image.src = ROUTE_IMG + data;
  image.alt = "image of product";
  swiper.appendChild(image);
  swipeWrapper.appendChild(swiper);
  if (filter == "app") {
    image.style.width = "auto";
    image.style.height = "696px";
  }
}
