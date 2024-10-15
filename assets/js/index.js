import Repository from "../data/repository.js";
const dataRepository = new Repository();
const skillBar1 = document.getElementById("skill-bar-1");
const skillBar2 = document.getElementById("skill-bar-2");
const projectList = document.getElementsByClassName("portfolio-container")[0];

const languages = dataRepository.getLanguages();

languages.forEach((language) => {
  const { name, value } = language;
  const divBar = document.createElement("div");
  divBar.classList.add("progress");
  divBar.innerHTML = `
    <span class="skill">${name} <i class="val">${value}%</i></span>
        <div class="progress-bar-wrap">
        <div class="progress-bar" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>`;
  skillBar1.appendChild(divBar);
});

const technologies = dataRepository.getTechnologies();

technologies.forEach((technology) => {
  const { name, value } = technology;
  const divBar = document.createElement("div");
  divBar.classList.add("progress");
  divBar.innerHTML = `
      <span class="skill">${name} <i class="val">${value}%</i></span>
          <div class="progress-bar-wrap">
          <div class="progress-bar" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`;
  skillBar2.appendChild(divBar);
});

const projects = dataRepository.getProjects();
shuffle(projects);

projects.forEach((project) => {
  const { name, desc, image, urlDetail, details } = project;
  const divProject = document.createElement("div");
  divProject.classList.add(
    "col-lg-4",
    "col-md-6",
    "ml-2",
    "mr-2",
    "portfolio-item",
    `filter-${details.filter}`
  );
  divProject.innerHTML = `<div class="portfolio-wrap" style="border: 3px solid #233100; border-radius: 20px">
  <img src="assets/img/portfolio/${image}" class="img-fluid" alt="">
  <div class="portfolio-info">
    <h4>${name}</h4>
    <p class="m-2">${desc}</p>
    <div class="portfolio-links">
      <a href="assets/img/portfolio/${image}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${name}"><i class="bx bx-plus"></i></a>
    </div>
  </div>
</div>`;
  projectList.appendChild(divProject);
});

  // <a href="${
  //       urlDetail + name
  //     }" class="portfolio-details-lightbox" data-glightbox="type: external"
  //       title="Portfolio Details"><i class="bx bx-link"></i></a>

/**
 * Initiate portfolio lightbox
 */
GLightbox({
  selector: ".portfolio-lightbox",
});

/**
 * Skills animation
 */
let skilsContent = select(".skills-content");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      let progress = select(".progress .progress-bar", true);
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}

/**
 * Initiate portfolio details lightbox
 */
GLightbox({
  selector: ".portfolio-details-lightbox",
  width: "90%",
  height: "90vh",
});

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
