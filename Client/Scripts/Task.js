import { taskModal } from "./TaskModal.js";

export class Task
{
    constructor(ID, TaskCode, Name, Description, TaskPriority, Estimation, parent, Employee)
    {
        this.ID = ID;
        this.TaskCode = TaskCode;
        this.Name = Name;
        this.Description = Description;
        this.TaskPriority = TaskPriority;
        this.Estimation = Estimation;
        this.Employee = Employee;

        this.parent = parent;
    }

    drawTasks(host)
    {
        if (!host)
            throw new Error ("There is no parent element.");

        this.DivContainerTasks = document.createElement("div");
        this.DivContainerTasks.className = "tasksList";
        host.appendChild(this.DivContainerTasks);

        let taskCodetask = document.createElement("span");
        taskCodetask.className = "taskCodetask";
        taskCodetask.innerHTML = this.TaskCode;
        this.DivContainerTasks.appendChild(taskCodetask);
        
        let taskName = document.createElement("span");
        taskName.className = "taskName";
        taskName.innerHTML = this.Name;
        this.DivContainerTasks.appendChild(taskName);

        let taskDescription = document.createElement("span");
        taskDescription.className = "taskDescription";
        taskDescription.innerHTML = this.Description;
        this.DivContainerTasks.appendChild(taskDescription);

        let taskEstimation = document.createElement("span");
        taskEstimation.className = "taskEstimation";
        taskEstimation.innerHTML = this.Estimation  + " estimation";;
        this.DivContainerTasks.appendChild(taskEstimation);

        let taskPriority = document.createElement("span");
        taskPriority.className = "taskPriority";
        switch (this.TaskPriority) {
        case 1: taskPriority.innerHTML = "Low priority"; break;
        case 2: taskPriority.innerHTML = "Medium priority"; break;
        case 3: taskPriority.innerHTML = "High priority"; break; }
        this.DivContainerTasks.appendChild(taskPriority);

        let taskEmployee = document.createElement("span");
        taskEmployee.className = " taskEmployee";
        if (this.Employee) 
        taskEmployee.innerHTML = this.Employee.Name  + " " + this.Employee.Surname + " assigned";
        else taskEmployee.innerHTML = "Unsigned";
        this.DivContainerTasks.appendChild( taskEmployee);

        let divButtons = document.createElement("div");
        this.DivContainerTasks.appendChild(divButtons);

        let btnUpdate = document.createElement("button");
        btnUpdate.class = "updateTask";
        btnUpdate.innerHTML = "Update";
        divButtons.appendChild(btnUpdate);

        btnUpdate.onclick = ()=>{
            taskModal.show(this);
        }

        let btnDelete = document.createElement("button");
        btnDelete.class = "deleteTask";
        btnDelete.innerHTML = "Delete";
        divButtons.appendChild(btnDelete);

        btnDelete.onclick = () => {
            let url = "https://localhost:5001/Task/DeleteTask/" + this.TaskCode;
      
            fetch(url, { method: "DELETE" }).then(t => {
              if (t.ok) { 
                document.querySelector(".btnShowProjectInfo-" + this.parent.FirmID).click();
              } else {
                alert("Delete failed!");
              }
            });
          };
    }

}