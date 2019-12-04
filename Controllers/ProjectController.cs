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
        public IActionResult All(int start, int limit, string createdat, string contributors, string bugs, string name, string search)
        {
            IQueryable<Project> Projects;
            Projects = (String.IsNullOrEmpty(search)) ? context.Projects : context.Projects.Where(p => p.Name.ToLower().Contains(search.ToLower()));
            Projects = Projects
            .Include(p => p.Creator)
            .Include(p => p.Bugs)
            .Include(p => p.Contributors)
                .ThenInclude(c => c.User);
            int Count = Projects.Count();
            if (createdat != "null") 
            {
                Projects = (createdat == "asc") ? Projects.OrderBy(p => p.CreatedAt).ThenBy(p => p.Name) : Projects.OrderByDescending(p => p.CreatedAt).ThenBy(p => p.Name);
            }
            else if (contributors != "null") 
            {
                Projects = (contributors == "asc") ? Projects.OrderBy(p => p.Contributors.Count).ThenBy(p => p.CreatedAt) : Projects.OrderByDescending(p => p.Contributors.Count).ThenBy(p => p.CreatedAt);
            }
            else if (bugs != "null") 
            {
                Projects = (bugs == "asc") ? Projects.OrderBy(p => p.Bugs.Count).ThenBy(p => p.CreatedAt) : Projects.OrderByDescending(p => p.Bugs.Count).ThenBy(p => p.CreatedAt);
            }
            else if (name != "null") 
            {
                Projects = (name == "asc") ? Projects.OrderBy(p => p.Name).ThenBy(p => p.CreatedAt) : Projects.OrderByDescending(p => p.Name).ThenBy(p => p.CreatedAt);
            }
            Projects = Projects.Skip(start).Take(limit);
            return OkJson(new { Projects = Projects.ToList(), Count = Count });
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