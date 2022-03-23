import { Project } from "./Project.js"
import { Task } from "./Task.js"

export class Firm
{
    constructor(ID, Name, VATNumber, RegisterNumber, YearOfEstablishment, Website)
    {
        this.ID = ID;
        this.Name = Name;
        this.VATNumber = VATNumber;
        this.RegisterNumber = RegisterNumber;
        this.YearOfEstablishment = YearOfEstablishment;
        this.Website = Website;

        this.Projects = [];
        this.Employees = [];
    }
    
    drawFirm(host) 
    {
        if (!host)
            throw new Error ("There is no parent element.");
    
        this.container = document.createElement("div");
        this.container.classList.add("containerFirm");
        host.appendChild(this.container);
    
        this.drawHeader(this.container);
        this.chooseProject(this.container);
    }

    drawHeader(host)
    {
        if (!host)
            throw new Error ("There is no parent element.");

        const containerHeader = document.createElement("div");
        containerHeader.className = "containerHeader";
        host.appendChild(containerHeader);

        let titleFirm = document.createElement("h1");
        titleFirm.className = "h1";
        titleFirm.innerHTML = this.Name;
        containerHeader.appendChild(titleFirm);

        let infoFirm = document.createElement("div");
        infoFirm.className = "infoFirm";
        containerHeader.appendChild(infoFirm);

        let nizFirmInfoLabel = ["VAT Number", "Register Number", "Year of Establishment", "Website"];
        let nizFirmInfo = [this.VATNumber, this.RegisterNumber, this.YearOfEstablishment, this.Website];

        for(let i=0; i<nizFirmInfoLabel.length; i++)
        {
            let divLabel = document.createElement("div");
            divLabel.className = "divLabel";
            infoFirm.appendChild(divLabel);

            let divInfo = document.createElement("div");
            divInfo.className="divInfo";
            divLabel.appendChild(divInfo);

            let label = document.createElement("label");
            label.innerHTML = nizFirmInfoLabel[i]+": ";
            divInfo.appendChild(label);

            let info = document.createElement("label");
            info.innerHTML=nizFirmInfo[i];
            info.className=nizFirmInfoLabel[i];
            divInfo.appendChild(info);
        }
    }

    chooseProject(host)
    {
        if (!host)
            throw new Error ("There is no parent element.");

        this.divChooseProject = document.createElement('div');
        this.divChooseProject.className = "divChooseProject";
        host.appendChild(this.divChooseProject)

        this.divSelectProject = document.createElement("div");
        this.divSelectProject.className = "divSelectProject";
        this.divChooseProject.appendChild(this.divSelectProject);

        this.selectProject = document.createElement("select");
        this.divSelectProject.appendChild(this.selectProject);
  
        for (let i = 0; i < this.Projects.length; ++i){
          var optProject = document.createElement("option");
          optProject.innerHTML = this.Projects[i].Name;
          optProject.value = this.Projects[i].ID;
          this.selectProject.appendChild(optProject);
        }

        const btnShowProjectInfo = document.createElement("button");
        btnShowProjectInfo.innerHTML="Show info";
        btnShowProjectInfo.className="btnShowProjectInfo";
        btnShowProjectInfo.classList.add("btnShowProjectInfo-" + this.ID);
        this.divSelectProject.appendChild(btnShowProjectInfo);

        this.divProjectContainer = document.createElement('div');
        this.divChooseProject.appendChild(this.divProjectContainer);

        btnShowProjectInfo.onclick=(ev)=>
        {
            const projectName = this.selectProject.value;
            
            if(projectName == null)
            {
                alert("Please select a project.");
                return;
            }

            this.divProjectContainer.innerHTML = "";

            this.Projects.filter(p=>p.ID == projectName)[0].projectInfo(this.divProjectContainer);

        }
    }
}