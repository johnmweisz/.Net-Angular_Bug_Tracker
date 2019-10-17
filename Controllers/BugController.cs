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
        [HttpPost("[action]")]
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
    }
}