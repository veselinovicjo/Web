import { Task } from "./Task.js";
import { taskModal } from "./TaskModal.js";
import { Employee } from "./Employee.js";

export class Project
{
    constructor(ID, Name, Description, StartDate, Deadline, Client,FirmID)
    {
        this.ID = ID;
        this.Name = Name;
        this.Description = Description;
        this.StartDate = StartDate;
        this.Deadline = Deadline;
        this.Client = Client;
        this.FirmID = FirmID

        this.Tasks = [];
    }

    projectInfo(host)
    {
        fetch("https://localhost:5001/Project/ReadProject/"+this.ID,
        {
            method:"GET"
        }).then(p=>{
            if(p.ok)
            {
                p.json().then(data=>{
                console.log(data);
                    this.ID = data.id;
                    this.Name = data.name;
                    this.Description = data.description;
                    this.StartDate = data.startDate;
                    this.Deadline = data.deadline;
                    this.Client = data.client;
                    this.FirmID = data.firmID
                    this.drawProjectInfo(host);
                    this.populateTasks(data.tasks);
                //host.innerHTML = JSON.stringify(data);
                //this.Tasks.filter(t=>t.ProjectID == this.ID)[0].drawTasks();
                })
            }
            else {
                alert("An error has occurred!");
            }
        })

    }

    populateTasks(tasks)
    {
        console.log(tasks);
        this.Tasks = tasks.map(t => new Task(t.id,t.taskCode, t.name, t.description, t.taskPriority, t.estimation,this, t.employee? new Employee(t.employee.id, t.employee.name, t.employee.surname) : null));
        this.Tasks.forEach(t=>t.drawTasks(this.taskContainer));

    }

    drawProjectInfo(host)
    {
        this.projectInfoContainer = document.createElement("div");
        this.projectInfoContainer.className = "projectInfoContainer";
        host.appendChild(this.projectInfoContainer);

        let nameContainer = document.createElement('div');
        this.projectInfoContainer.appendChild(nameContainer)

        let nameLabel = document.createElement('label');
        nameContainer.appendChild(nameLabel)
        nameLabel.innerHTML= `Name: ${this.Name}`;

        nameContainer = document.createElement('div');
        this.projectInfoContainer.appendChild(nameContainer)

        nameLabel = document.createElement('label');
        nameContainer.appendChild(nameLabel)
        nameLabel.innerHTML= `Description: ${this.Description}`;

        nameContainer = document.createElement('div');
        this.projectInfoContainer.appendChild(nameContainer)

        nameLabel = document.createElement('label');
        nameContainer.appendChild(nameLabel)
        nameLabel.innerHTML= `Client: ${this.Client}`;

        nameContainer = document.createElement('div');
        this.projectInfoContainer.appendChild(nameContainer)

        nameLabel = document.createElement('label');
        nameContainer.appendChild(nameLabel)
        nameLabel.innerHTML= `Start date: ${this.StartDate.split('T')[0]}`;

        nameContainer = document.createElement('div');
        this.projectInfoContainer.appendChild(nameContainer)

        nameLabel = document.createElement('label');
        nameContainer.appendChild(nameLabel)
        nameLabel.innerHTML= `Deadline: ${this.Deadline.split('T')[0]}`;

        const addButton = document.createElement('button');
        this.projectInfoContainer.appendChild(addButton);
        addButton.innerHTML = 'Add Task';
        addButton.onclick= ()=>{
            taskModal.show({projectID : this.ID,firmID : this.FirmID});
        }

        this.taskContainer = document.createElement('div');
        host.appendChild(this.taskContainer);
    }
}