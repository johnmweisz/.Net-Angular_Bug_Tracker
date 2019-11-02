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
        public IActionResult GetAll()
        {
            List<Project> Projects = context.Projects
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User)
            .OrderBy(p => p.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetAdded(int UserId)
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

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetContributed(int UserId)
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

		[HttpGet("[action]/{ProjectId}")]
        public IActionResult GetOne(int ProjectId)
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

		[HttpDelete("[action]/{ProjectId}")]
        public IActionResult Delete(int ProjectId)
        {
            Project Project = context.Projects.FirstOrDefault(p => p.ProjectId == ProjectId);
            context.Remove(Project);
            context.SaveChanges();
            return Ok();
        }

    }
}