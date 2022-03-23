using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace IT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        public ITContext Context { get; set; }
        public TaskController(ITContext context)
        {
            Context = context;
        }

        [Route("{idProject}/ReadTasks/")]
        [HttpGet]
        public async Task<ActionResult> ReadTask(int idProject)
        {
            try
            {
                return Ok(await Context.Tasks.Where(p => p.Project.ID == idProject).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("CreateTask")]
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] Models.Task task)

        {
            if (string.IsNullOrWhiteSpace(task.TaskCode) || task.TaskCode.Length > 20)
            {
                return BadRequest("Wrong Task Code!");
            }

            if (string.IsNullOrWhiteSpace(task.Name) || task.Name.Length > 100)
            {
                return BadRequest("Wrong Task Name!");
            }

            try
            {
                var employee = await Context.Employees.FirstOrDefaultAsync(e=>e.ID == task.EmployeeID);
                if(employee == null) return BadRequest("Employee doesn't exist.");

                var project = await Context.Projects.FirstOrDefaultAsync(e=>e.ID == task.ProjectID);
                if(project == null) return BadRequest("Project doesn't exist.");
                
                task.Employee = employee;
                task.Project = project;
                Context.Tasks.Add(task);
                
                await Context.SaveChangesAsync();
                return Ok($"Task added!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("UpdateTask/{code}")]
        [HttpPut]
        public async Task<ActionResult> UpdateTask (string code, Models.Task task)
        {
            if (code.Length > 20)
            {
                return BadRequest("Wrong Code!");
            }

            try
            {
                var taskdb = Context.Tasks.FirstOrDefault(p => p.TaskCode == code);

                var employee = await Context.Employees.FirstOrDefaultAsync(e=>e.ID == task.EmployeeID);
                if(employee == null) return BadRequest("Employee doesn't exist.");

                if (taskdb != null)
                {
                    taskdb.Name = task.Name;
                    taskdb.Description = task.Description;
                    taskdb.TaskPriority = task.TaskPriority;
                    taskdb.Estimation = task.Estimation;
                    taskdb.Employee = employee;

                    await Context.SaveChangesAsync();
                    return Ok($"Task updated!");
                }
                else
                {
                    return BadRequest("Task not found!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [Route("DeleteTask/{code}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteTask(string code)
        {
            if (code.Length > 20)
            {
                return BadRequest("Wrong Code!");
            }

            try
            {
                var task = await Context.Tasks.FirstOrDefaultAsync(t=> t.TaskCode == code);
                if(task == null) return BadRequest("Task does not exist.");
                
                Context.Tasks.Remove(task);
                await Context.SaveChangesAsync();
                return Ok($"Successfully deleted task!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}