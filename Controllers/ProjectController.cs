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

        [HttpGet("[action]")]
        public IActionResult All(int start = 0, int limit = 20, bool ascending = true)
        {
            IQueryable<Project> Projects = context.Projects
            .Skip(start)
            .Take(limit)
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User);
			if (ascending == true)
			{
				Projects = Projects.OrderBy(p => p.CreatedAt);
			} else {
                Projects = Projects.OrderByDescending(p => p.CreatedAt);
            }
            return OkJson(Projects.ToList());
        }

        [HttpGet("[action]")]
        public IActionResult Added(int UserId)
        {
            List<Project> Projects = context.Projects
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User)
			.Where(p => p.UserId == UserId)
            .OrderBy(p => p.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

        [HttpGet("[action]")]
        public IActionResult Contributed(int UserId)
        {
            List<Project> Projects = context.Projects
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User)
			.Where(p => p.Contributors.Any(c => c.UserId == UserId))
            .OrderBy(p => p.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

		[HttpGet("[action]")]
        public IActionResult One(int ProjectId)
        {
            Project Project = context.Projects
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User)
			.FirstOrDefault(p => p.ProjectId == ProjectId);
            return OkJson(Project);
        }

		[HttpPost("[action]")]
        public IActionResult Add([FromBody] Project NewProject)
        {
            if(ModelState.IsValid)
            {
                context.Add(NewProject);
                context.SaveChanges();
                return OkJson(NewProject);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

        [HttpPut("[action]")]
        public IActionResult Edit([FromBody] Project EditProject)
        {
            if (ModelState.IsValid)
            {
            Project Project = context.Projects.FirstOrDefault(p => p.ProjectId == EditProject.ProjectId);
				Project.Name = EditProject.Name;
				Project.Description = EditProject.Description;
				Project.Version = EditProject.Version;
				Project.Public = EditProject.Public;
				Project.URL = EditProject.URL;
                Project.UpdatedAt = DateTime.Now;
                context.SaveChanges();
                return OkJson(Project);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

		[HttpDelete("[action]")]
        public IActionResult Delete(int ProjectId)
        {
            Project Project = context.Projects.FirstOrDefault(p => p.ProjectId == ProjectId);
            context.Remove(Project);
            context.SaveChanges();
            return Ok();
        }

    }
}