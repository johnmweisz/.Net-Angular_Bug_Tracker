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

		private IActionResult OkJson(object ToJSON) {
			return Ok(JsonConvert.SerializeObject(
				ToJSON,
				Formatting.Indented,
				new JsonSerializerSettings 
					{
						ReferenceLoopHandling = ReferenceLoopHandling.Ignore
					}
			));
		}

        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            List<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return OkJson(Bugs);
        }

		[HttpGet("[action]/{BugId}")]
        public IActionResult GetOne(int? BugId)
        {
            Bug Bug = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
			.FirstOrDefault(b => b.BugId == BugId);
            return OkJson(Bug);
        }

		[HttpPost("[action]")]
        public IActionResult Add([FromBody] Bug NewBug)
        {
            if(ModelState.IsValid)
            {
                context.Add(NewBug);
                context.SaveChanges();
                return OkJson(NewBug);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

    }
}