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
            .Include(b => b.Creator)
            .Include(b => b.Bugs)
            .Include(b => b.Contributors)
                .ThenInclude(a => a.User)
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetAdded(int UserId)
        {
            List<Project> Projects = context.Projects
            .Include(b => b.Creator)
            .Include(b => b.Bugs)
            .Include(b => b.Contributors)
                .ThenInclude(a => a.User)
			.Where(b => b.UserId == UserId)
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

        [HttpGet("[action]/{UserId}")]
        public IActionResult GetContributed(int UserId)
        {
            List<Project> Projects = context.Projects
            .Include(b => b.Creator)
            .Include(b => b.Bugs)
            .Include(b => b.Contributors)
                .ThenInclude(a => a.User)
			.Where(b => b.Contributors.Any(a => a.UserId == UserId))
            .OrderBy(b => b.CreatedAt)
            .ToList();
            return OkJson(Projects);
        }

		[HttpGet("[action]/{ProjectId}")]
        public IActionResult GetOne(int ProjectId)
        {
            Project Project = context.Projects
            .Include(b => b.Creator)
            .Include(b => b.Bugs)
            .Include(b => b.Contributors)
                .ThenInclude(a => a.User)
			.FirstOrDefault(b => b.ProjectId == ProjectId);
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
            Project Project = context.Projects.FirstOrDefault(b => b.ProjectId == EditProject.ProjectId);
				Project.Name = EditProject.Name;
				Project.Description = EditProject.Description;
				Project.Public = EditProject.Public;
				Project.URL = EditProject.URL;
				Project.Status = EditProject.Status;
				Project.UserId = EditProject.UserId;
                Project.UpdatedAt = DateTime.Now;
                context.SaveChanges();
                return OkJson(Project);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

		[HttpDelete("[action]/{ProjectId}")]
        public IActionResult Delete(int ProjectId)
        {
			Bug Bug = context.Bugs.FirstOrDefault(b => b.ProjectId == ProjectId);
            context.Remove(Bug);
            context.SaveChanges();
            return Ok();
        }

    }
}