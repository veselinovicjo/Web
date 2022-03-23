using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq;

namespace IT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        public ITContext Context { get; set; }
        public EmployeeController(ITContext context)
        {
            Context = context;
        }

        [Route("ReadEmployees/{firmId}")]
        [HttpGet]
        public async Task<ActionResult> ReadEmployee(int firmId)
        {
            try
            {
                return Ok(await Context.Employees.Where(e=>e.FirmID == firmId).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}