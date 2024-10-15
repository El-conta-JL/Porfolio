import skillsData from "./skills-data.json" with { type: "json" };
import portfolioData from "./portfolio-data.json" with { type: "json" };

export default class Repository {
  getLanguages() {
    return skillsData.languages;
  }
  getTechnologies() {
    return skillsData.technologies;
  }
  getProjects() {
    return portfolioData.projects;
  }
}
