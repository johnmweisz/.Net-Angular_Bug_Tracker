using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BugTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BugTracker.Controllers
{
    [Route("[controller]")]
    public class BugController : Controller
    {
        private Context context;
        public BugController(Context context)
        {
            this.context = context;
        }
        [HttpGet("[action]")]
        public IActionResult GetBugs()
        {
            List<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return Ok(JsonConvert.SerializeObject(
                Bugs,
                Formatting.Indented,
                new JsonSerializerSettings
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    }
                )
            );
        }

		[HttpGet("[action]/{BugId}")]
        public IActionResult GetBug(int? BugId)
        {
            Bug Bug = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
			.FirstOrDefault(b => b.BugId == BugId);
            return Ok(JsonConvert.SerializeObject(
                Bug,
                Formatting.Indented,
                new JsonSerializerSettings
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    }
                )
            );
        }

		[HttpGet("[action]")]
        public IActionResult AddBug([FromBody] Bug NewBug)
        {
            if(ModelState.IsValid)
            {
                context.Add(NewBug);
                context.SaveChanges();
                return Ok(JsonConvert.SerializeObject(
                    NewBug,
                    Formatting.Indented,
                    new JsonSerializerSettings 
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }
                ));
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

    }
}