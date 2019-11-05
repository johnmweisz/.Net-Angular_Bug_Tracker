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

		private IActionResult OkJson(object ToJson) {
			return Ok(JsonConvert.SerializeObject(
				ToJson,
				Formatting.Indented,
				new JsonSerializerSettings 
					{
						ReferenceLoopHandling = ReferenceLoopHandling.Ignore
					}
			));
		}

		[HttpGet("[action]/{ProjectId?}")]
		public IActionResult GetAll(int? ProjectId = null)
		{
			IQueryable<Bug> Bugs = context.Bugs
			.Include(b => b.Creator)
			.Include(b => b.Updates)
				.ThenInclude(a => a.User)
			.OrderBy(b => b.CreatedAt);
			if (ProjectId != null)
			{
				Bugs = Bugs.Where(b => b.ProjectId == ProjectId);
			}
			return OkJson(Bugs.ToList());
		}

        [HttpGet("[action]/{UserId}/{ProjectId?}")]
        public IActionResult GetAdded(int UserId, int? ProjectId = null)
        {
            IQueryable<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Updates)
                .ThenInclude(a => a.User)
			.Where(b => b.UserId == UserId)
            .OrderBy(b => b.CreatedAt);
			if (ProjectId != null)
			{
				Bugs = Bugs.Where(b => b.ProjectId == ProjectId);
			}
            return OkJson(Bugs.ToList());
        }

        [HttpGet("[action]/{UserId}/{ProjectId?}")]
        public IActionResult GetAssigned(int UserId, int? ProjectId = null)
        {
            IQueryable<Bug> Bugs = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Updates)
                .ThenInclude(a => a.User)
			.Where(b => b.Updates.Any(a => a.UserId == UserId))
            .OrderBy(b => b.CreatedAt);
			if (ProjectId != null)
			{
				Bugs = Bugs.Where(b => b.ProjectId == ProjectId);
			}
            return OkJson(Bugs.ToList());
        }

		[HttpGet("[action]/{BugId}")]
        public IActionResult GetOne(int BugId)
        {
            Bug Bug = context.Bugs
            .Include(b => b.Creator)
            .Include(b => b.Updates)
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

        [HttpPut("[action]")]
        public IActionResult Edit([FromBody] Bug EditBug)
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

		[HttpDelete("[action]/{BugId}")]
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