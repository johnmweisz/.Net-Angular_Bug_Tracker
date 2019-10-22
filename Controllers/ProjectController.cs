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
    public class ProjectController : Controller
    {
        private Context context;
        public ProjectController(Context context)
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

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetAdded(int? UserId)
        {
            List<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
			.Where(b => b.UserId == UserId)
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return OkJson(Bugs);
        }

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetAssigned(int? UserId)
        {
            List<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Assigned)
                .ThenInclude(a => a.User)
			.Where(b => b.Assigned.Any(a => a.UserId == UserId))
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

        [HttpPost("[action]")]
        public IActionResult Edit([FromBody] EditBug EditBug)
        {
            if (ModelState.IsValid)
            {
                Bug Bug = context.Bugs.FirstOrDefault(b => b.BugId == EditBug.BugId);
				Bug.Subject = EditBug.Subject;
				Bug.Description = EditBug.Description;
				Bug.Priority = EditBug.Priority;
				Bug.Status = EditBug.Status;
				Bug.DueDate = EditBug.DueDate;
                Bug.UpdatedAt = DateTime.Now;
                context.SaveChanges();
                return OkJson(Bug);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

		[HttpGet("[action]/{BugId}")]
        public IActionResult Delete(int? BugId)
        {
            if (BugId == null) BadRequest();
			Bug Bug = context.Bugs.FirstOrDefault(b => b.BugId == BugId);
            context.Remove(Bug);
            context.SaveChanges();
            return Ok();
        }

    }
}