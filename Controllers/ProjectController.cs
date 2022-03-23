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
    public class ProjectController : ControllerBase
    {
        public ITContext Context { get; set; }
        public ProjectController(ITContext context)
        {
            Context = context;
        }

        [HttpGet("ReadProjects/{firmId}")]
        public async Task<ActionResult> ReadProjects(int firmId)
        {
            try
            {
                return Ok(await Context.Projects.Where(p => p.FirmID == firmId).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ReadProject/{projectId}")]
        public async Task<ActionResult> ReadProject(int projectId)
        {
            try
            {
                return Ok(await Context.Projects.Include(x => x.Tasks).ThenInclude(x => x.Employee).AsQueryable().FirstOrDefaultAsync(x => x.ID == projectId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}