import { Firm } from "./Firm.js";
import { Project } from "./Project.js";

const baseUrl = "https://localhost:5001/";

fetch(`${baseUrl}Firm/ReadFirms`).then((p) => {
  p.json().then((data) => {
    data.forEach(async (firm) => {
        
      const f = new Firm(
        firm.id,
        firm.name,
        firm.vatNumber,
        firm.registerNumber,
        firm.yearOfEstablishment,
        firm.website
      );

      const projects = await getProjects(firm.id);
      f.Projects = projects;
      f.drawFirm(document.body);
    });
  });
});

async function getProjects(firmId) {
  const req = await fetch(`${baseUrl}Project/ReadProjects/${firmId}`);
  if (req.ok)
    return (await req.json()).map(
      (project) =>
        new Project(
          project.id,
          project.name,
          project.description,
          project.startDate,
          project.deadline,
          project.client,
          project.firmID
        )
    );
}
