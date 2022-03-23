import { Task } from "./Task.js";

class TaskModal {
  constructor() {
    this.modalBackdrop = document.createElement("div");
    document.body.appendChild(this.modalBackdrop);

    this.modalBackdrop.onclick = () => {
      this.hide();
    };

    this.modalBackdrop.className = "modal-backdrop";

    this.modal = document.createElement("div");
    this.modalBackdrop.appendChild(this.modal);
    this.modal.className = "modal";

    this.modal.onclick = (ev) => {
      ev.stopPropagation();
    };
  }

  show(task) {
    this.modalBackdrop.style.display = "flex";
    this.drawModalInner(task);
  }

  hide() {
    this.modalBackdrop.style.display = "none";
  }

  async drawModalInner(task) {
    if (task.ID) this.TaskId = task.ID;
    else this.TaskId = undefined;

    this.projectID = task.projectID;
    if (task.parent?.ID) 
    {this.projectID = task.parent?.ID
    this.firmID = task.parent.FirmID;};

    console.log(task);

    this.modal.innerHTML = "";
    const form = document.createElement("form");

    this.modal.appendChild(form);

    let div = document.createElement("div");
    form.appendChild(div);
    let label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = "Task code:";
    this.taskCodeInput = document.createElement("input");
    div.appendChild(this.taskCodeInput);
    if (task.TaskCode) this.taskCodeInput.value = task.TaskCode;

    div = document.createElement("div");
    form.appendChild(div);
    label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = "Name:";
    this.NameInput = document.createElement("input");
    div.appendChild(this.NameInput);
    if (task.Name) this.NameInput.value = task.Name;

    div = document.createElement("div");
    form.appendChild(div);
    label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = "Description:";
    // this.descriptionInput = document.createElement("textarea");
    this.descriptionInput = document.createElement("input");
    div.appendChild(this.descriptionInput);
    if (task.Description) this.descriptionInput.value = task.Description;

    div = document.createElement("div");
    form.appendChild(div);
    label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = "Priority:";
    this.taskPriorityInput = document.createElement("select");
    div.appendChild(this.taskPriorityInput);

    let option = document.createElement("option");
    option.innerHTML = "Low";
    option.value = 1;
    if (task) option.selected = task.TaskPriority == 1;
    this.taskPriorityInput.appendChild(option);

    option = document.createElement("option");
    option.innerHTML = "Medium";
    option.value = 2;
    if (task) option.selected = task.TaskPriority == 2;
    this.taskPriorityInput.appendChild(option);

    option = document.createElement("option");
    option.innerHTML = "High";
    option.value = 3;
    if (task) option.selected = task.TaskPriority == 3;
    this.taskPriorityInput.appendChild(option);

    div = document.createElement("div");
    form.appendChild(div);
    label = document.createElement("label");
    div.appendChild(label);
    label.innerHTML = "Estimation:";
    this.estimationInput = document.createElement("input");
    div.appendChild(this.estimationInput);
    if (task.Estimation) this.estimationInput.value = task.Estimation;

    let firmId = task.firmID;
    if (task.parent?.FirmID) firmId = task.parent.FirmID;

    const employees = await this.getEmployees(firmId);

    if (employees) {
      div = document.createElement("div");
      form.appendChild(div);
      label = document.createElement("label");
      div.appendChild(label);
      label.innerHTML = "Employee:";
      this.employeeInput = document.createElement("select");
      div.appendChild(this.employeeInput);
      employees.forEach((employee) => {
        const option = document.createElement("option");
        option.innerHTML = employee.name + " " + employee.surname;
        option.value = employee.id;
        this.employeeInput.appendChild(option);
      });

      const saveButton = document.createElement("button");

      saveButton.innerHTML = "Save";
      saveButton.type = "button";
      form.appendChild(saveButton);
      saveButton.onclick = () => {
        this.save();
      };
    }
  }

  async getEmployees(firmID) {
    const res = await fetch(
      "https://localhost:5001/Employee/ReadEmployees/" + firmID
    );
    if (res.ok) return await res.json();

    return null;
  }

  save() {
    const objZaSlanje = {
      taskCode: this.taskCodeInput.value,
      name: this.NameInput.value,
      description: this.descriptionInput.value,
      taskPriority: parseInt(this.taskPriorityInput.value),
      estimation: this.estimationInput.value,
      employeeID: parseInt(this.employeeInput.value),
      projectID: this.projectID,
    };
    console.log(objZaSlanje);

    let method = "POST";
    let url = "Create";
    if (this.TaskId) {
      method = "PUT";
      url = "Update";
    }

    fetch(
      `https://localhost:5001/Task/${url}Task/${
        method == "PUT" ? objZaSlanje.taskCode : ""
      }`,
      {
        method,
        body: JSON.stringify(objZaSlanje),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {this.hide();
        document.querySelector(".btnShowProjectInfo-" + this.firmID).click()});
  }
}

export const taskModal = new TaskModal();
