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
    public class FirmController : ControllerBase
    {
        public ITContext Context { get; set; }
        public FirmController(ITContext context)
        {
            Context = context;
        }

        // [Route("ReadFirms")]
        [HttpGet("ReadFirms")]
        public async Task<ActionResult> ReadFirm()
        {
            Console.WriteLine("entered");
            try
            {
                return Ok(await Context.Firms.OrderBy(f=>f.ID).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}